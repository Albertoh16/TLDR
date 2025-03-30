from transformers import pipeline

# Load the pre-trained BART model for summarization
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Example text to summarize
text = """
Contents

    Beginning
    Sources

Wildfires wreak havoc across parts of Texas

    Article
    Collaboration

    Read
    Pending changes
    Edit
    View history

Tools

Appearance
Text

    Small
    Standard
    Large

Width

    Standard
    Wide

Checked
Texas
Related articles

    27 March 2025: Wildfires wreak havoc across parts of Texas
    20 March 2025: South by Southwest film festival wraps up in Austin, Texas
    27 February 2025: Freezing temps sweep across parts of Texas
    17 February 2025: Severe weather affects portions of Texas
    17 February 2025: NASA's OSIRIS-REx arrives in Houston, US after returning asteroid samples to Earth

Location of Texas
Collaborate!

    Pillars of Wikinews writing
    Writing an article

Texas

Thursday, March 27, 2025
File photo of the old fire station in Hamilton, Texas(US).Credit: Larry D. Moore

Damaging wildfires have stretched across huge parts of the US state of Texas during the month of March. As of Monday morning, all fires across the central part of the state are contained. As of early last week, 50 acres in Gillespie county alone had been damaged by fires, according to a media source. Some residents evacuated the area for safety.

This year, more than 11,000 acres were hit be fires in the central part of the state. The so named Crabapple Fire, was listed as 'contained' on Friday, after striking 9,858 acres. The first fire began on January 20, and impacted over 100 acres of land. It was listed as 'contained' one day later. """

# Generate a summary
summary = summarizer(text, max_length=50, min_length=10, do_sample=False)

print("Summary:", summary[0]["summary_text"])
