# Study Hub - Your Academic Genie

This is a modern website for Study Hub with a Genie theme, designed to help students access study resources for various subjects.

## Features

- **Modern Responsive Design**: Works well on desktop, tablet, and mobile devices
- **Genie Theme**: Magical interface with smooth animations and transitions
- **Subject Resources**: Organized collection of study materials by subject
- **DSA Special Section**: Dedicated resources for Data Structures and Algorithms
- **Brahmastra Resources**: Ultimate academic resources for exam preparation
- **Search Functionality**: Easily find subjects and resources
- **Interactive UI**: Modal popups, smooth scrolling, and animations

## File Structure

```
website/
├── css/
│   └── style.css             # Main stylesheet
├── images/                   # Contains all images for the website
├── js/
│   └── script.js             # Main JavaScript file
├── data.json                 # Sample data with a few subjects
├── full_data.json            # Complete data with all subjects
├── index.html                # Main HTML file
└── README.md                 # This file
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser to view the website
3. The website loads subject data from `data.json`. To use the complete dataset, rename `full_data.json` to `data.json`

## Adding New Subjects

To add new subjects, edit the `data.json` file. Each subject should follow this structure:

```json
{
  "subject": "Subject Name",
  "syllabus": "Subject Code",
  "books": ["Book 1", "Book 2"],
  "units": {
    "Unit-1": "Unit 1 Description",
    "Unit-2": "Unit 2 Description"
  },
  "notes": ["Link to Notes 1", "Link to Notes 2"],
  "playlists": ["YouTube Playlist Link"],
  "tutorial_sheets": {
    "Tut-1": "Tutorial 1 Description",
    "Tut-1_Solution": "Link to Solution"
  },
  "practical_files": ["Link to Practical Files"],
  "previous_year_questions": {
    "Midsem": "Link to Midsem Papers",
    "Endsem": "Link to Endsem Papers"
  },
  "extra_resources": ["Resource 1", "Resource 2"]
}
```

## Customization

- **Colors**: Edit the CSS variables at the top of `style.css` to change the color scheme
- **Images**: Replace the images in the `images` folder with your own
- **Content**: Modify the HTML content in `index.html` to change text and sections

## Dependencies

- [Font Awesome](https://fontawesome.com/) - for icons
- [Google Fonts](https://fonts.google.com/) - for typography
- [AOS](https://michalsnik.github.io/aos/) - for scroll animations

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Extracting Data from GYANSUTRA_2.0.pdf

The website is designed to display data extracted from the GYANSUTRA_2.0.pdf file. The data should be structured in JSON format as shown in the `data.json` and `full_data.json` files.

If you need to extract more data from the PDF:

1. Extract subject information from the PDF following the structure in the JSON files
2. Add new entries to the `subjects` array in `data.json`
3. Make sure to include all required fields for each subject

## License

This project is open source and available for educational purposes.

## Contact

For any questions or support, please contact: info@studyhub.com
