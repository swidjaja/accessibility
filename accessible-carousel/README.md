# Simple Accessible Carousel

## About this POC

This POC demonstrates a simple carousel that I think is adequately accessible for Web uses. It is friendly for both mouse users, keyboard users, and reader users.

- Mouse users: they can scroll through the contents 
- Keyboard and reader users: they can navigate through the contents and use the previous/next button to go to next page of contents. When they use the next/previous button, the focus will be automatically set to the first visible item.

POC has only been tested on Firefox, Chrome, and Safari browsers on Mac with VoiceOver reader.

Interesting Observation
- `<section>` with `aria-describedby` is not recognized as region for the following: `Chrome/Safari + VO`
- `<section>` with `aria-labelledby` is not recognized as region for Chrome + VO but it is recognized on `Safari + VO`
- `<section>` with `aria-label` is recognized as region for the following: `Chrome/Safari + VO`