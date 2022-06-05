# Accessibility (A11y) - POC
[![Netlify Status](https://api.netlify.com/api/v1/badges/a228acd0-3839-46e2-b8a1-cba4a6088b6e/deploy-status)](https://app.netlify.com/sites/a11y-demo/deploys)

This project has the objective of demonstrating the accessibility main concepts in front-end. A11y is an important theme that is frequently ignored by front-end developers. With simple techniques, it's possible to improve the experience of people with disabilities or deficiencies when navigating our webpage. After all, this group of people represents 25% of the global population, and our application should be accessible by everyone.

<img src="https://github.com/raiane-honorato/poc-a11y/blob/main/mocked%20application.png" width="700" alt="application frame">

## Main resources
This project aims to demonstrate:
* Use of semantic HTML
* Use of WAI-ARIA to manipulate the accessibility tree
* Use of BEM methodology on CSS
* Manipulation of `focus`, `tabindex` and WAI-ARIA by javascript to ensure accessibility

## Main concepts demonstrated
### Use of semantic HTML improves the experience of people with low or no vision ability
* Native `buttons` should always be used instead of custom buttons made with a `div` or something similar, because it is clickable by keyboard, focusable and screen readers recognize it as a `button`. The same conclusion is valid for other HTML elements, such as `input` or `select`. Therefore, using semantic elements is always better than making customized ones for accessibility. If customization is extremely needed, it's important to make sure all the points commented are properly treated by following [W3]([url](https://www.w3.org/WAI/ARIA/apg/patterns/)) recommendations. This includes things such as adding a `role`to the custom element and events such as pressing enter or space.
* Using `h1`...`h6` elements is helpful both for accessibility and for SEO. In case of accessibility, it's common for people with vision disabilities to navigate through the pages titles to have an understanding of what that page is about.
* The same is valid for landmarks such as `main`, `section`and `nav`. Screen readers tend to have the functionality of navigating through these items.
### Elements hidden on DOM should not be focusable or interactable. When these elements are shown on screen the focus should be redirected to it.
* Using `visibility: hidden` or `display: none` on CSS makes sure that the element is not interactable by screen readers or keyboard. So, it's important to use these tools to hide elements, instead of just resources as `opacity`or manipulating size. This project uses `visibility: hidden`, because it also allows transitions to happen on CSS.
* When a popup or a dropdown menu is shown on screen, the focus should be redirected to this element, so screen readers or keyboard users know that a new element is on screen.
### Manipulate `tabIndex` to improve keyboard experience
* Elements hidden should not be focusable by the keyboard. A possible solution for this is manipulating the tabIndex. When an element has a tabIndex value of 0, it's focusable. When it has a negative value, it won't be focusable. This project uses the previously described `visibility: hidden` solution to prevent these elements are intractable.
* This is also useful when a pop-up is on the screen to prevent the elements behind the pop-up are focusable. This project uses this strategy.
### Using `aria-label`, `aria-expanded`, `aria-controls` and `aria-haspopup`
* `aria-label` allows an element to have a title, even if it's not on screen. For example, a button that has only an icon may be intuitive for sighted people, but adding a title is necessary for screen reader users.
* `aria-expanded` allows screen reader users to understand if an element is open or closed. It's useful for menu or dropdown buttons, for example.
* `aria-haspopup="true"` indicates that an element has a pop up associated, for example a dropdown button. This is announced by screen readers and helps to get a better understanding of the page.
* `aria-controls` indicates that that element controls another one. By adding the controlled element id (`aria-controls={element-id-here}`), it is flagged that these elements are connected.
### Not all images should have an `alt` value
* Images that bring meaning to the page content should have an alt value to be accessible for screen reader users.
* Images that are used just for aesthetic goals, such as some icons or background images, should not have an `alt` value, because it won't bring valuable information to screen reader users. In that cases, the alt value should be declared as: `alt=""`.
