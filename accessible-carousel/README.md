# Simple Accessible Carousel

## About this POC

This POC demonstrates a simple carousel that I think is adequately accessible for Web uses. It is friendly for both mouse users, keyboard users, and screen reader users.

- Mouse users: they can scroll through the contents 
- Keyboard and screen reader users: they can navigate through the contents and use the previous/next button to go to next page of contents.

POC has only been tested on Firefox, Chrome, and Safari browsers on Mac with VoiceOver reader.

Interesting Observation
- `<section>` with `aria-describedby` is not recognized as region for the following: `Chrome/Safari + VO`
- `<section>` with `aria-labelledby` is not recognized as region for Chrome + VO but it is recognized on `Safari + VO`
- `<section>` with `aria-label` is recognized as region for the following: `Chrome/Safari + VO`

Open Questions
1. Should we auto-focus on first visible item after we click on previous/next button? If we auto-focus on first item, then it is helpful for screen reader users because they don't have to tab back to view the first visible item. On the other hand, this will inconvenience keyboard users because they now have to do extra tabs. If we don't auto-focus on first item, then keyboard users won't have to do extra tabs. However, this will inconvenience screen reader users because they have to tab back to view the first visible item.