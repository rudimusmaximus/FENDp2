# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

# My Notes Completing This
# Ongoing Questions and Lessons Learned  

## Questions as I Completed this:  
These are working notes, I'll be seeking answers on these questions over time.

| Question | Answer |
| :--- | :--- |
| 1.  |  |
| 2.  |  |
| 3.  |  |
| 4.  |  |
| 5.  |  |
| 6.  |  |  
| 7.  |  |
| 8.  |  |  

**Example for Question x**
```
// notes
```  

## Lessons learned:  

| Area | Comments |
| :--- | :--- |
| 1. Elements, nodes, arrays | a. When you select a list of elements or a node, these are array like objects. So if you want to do array things with them, one technique is Array.from() |
| 2. not exclusions in query selectors | a. you can use pseudo CSS3 selectors to do exclusions! see https://stackoverflow.com/questions/35137517/adding-an-exception-for-queryselectorall |
| 3. .filter with .map handy | a. see example |
| 4. event loop | a. [set timeout use](https://www.youtube.com/watch?v=8aGhZQkoFbQ) |  

**Example for Lesson 3**
From this elegant and [short video](https://www.youtube.com/watch?v=D0FzqTWedM0&feature=push-u-sub&attr_tag=4QuNiXqbrIloXwVe%3A6).
```js
const nonEmptyFields =
  [ ... document.querySelectorAll('input.todo')]
    .filter(input => input.value != '')
    .map(input => ({
        name: input.name,
        value: input.value
      }))
//or
const nonEmptyFields =
  [ ... document.querySelectorAll('input.todo')]
    .filter(input => input.value != '');

```  
## Assumptions required to solve the problem
The following assumptions were made by evaluation the code and experimenting with query selections results.

- class name is a small set that will vary in their order in the elements[#].classList
- elements[#].firstElementChild.classList does not vary in order, and the 0 item is fa (assume font awesome as this is part of the stylesheet prefetch), item 1 is the name of the object
so
- decks have 16 cards
- cards have class card and additionally
  - are visible with show class
  - when first made visible they are given open class
  - when paired they are given match and open is removed
- to access the shape name, node[#].firstElementChild.classList[1] might equal say fa-diamond or fa-bolt; this should be enough to match skip matching

Logic:
click >
make card open and show
does class list for card include match, if so, remove open
  else card is open show to be matched (candidates)
  is card on not matched list by query what's not match
if yes,

## DevFlow
I used my DevFlow process to do this work did not create issues for each section of the rubric. I did use following git commit guidelines, a 'Git Flow' branching model, and a custom label scheme. Hosted on GitHub and used Atom and GitKraken with it's new "Glo Boards".
Part of my evolving way of doing projects.

My focus is to catch up in the course, so I'm going to try to stick only to the requirements only.
