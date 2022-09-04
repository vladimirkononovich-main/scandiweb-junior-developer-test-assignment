# Scandiweb Junior Developer test assignment

This is solution for [Scandiweb Junior Developer test assignment](https://www.notion.so/Entry-React-developer-TEST-39f601f8aa3f48ac88c4a8fefda304c1).

It's a simple online store that allows to browse product categories and products and order them.

### How to run

1.  Clone this repository `git clone`
2.  Install dependencies `npm ci`
3.  Run app `npm start`
4.  Install and run GraphQL endpoint https://github.com/scandiweb/junior-react-endpoint

### Technologies used

- React (class components)
- Redux (state managment)
- React Router (client-side routing) + redux-react-router (connect routing to Redux)
- Apollo (GraphQL)
- BEM (CSS naming convention)

### Implementation notes

- To preserve current page client-side routing is used (react-router)
- When page is loaded we parse category id and load category data from GraphQL
- Category data is not cached to make implementation simpler. In real-world app it's probably a good idea to cache it instead of loading every time category page is visited.
- Products in the cart, selected currency and other app state is persisted to localStorage
- Some products (AirPods for example) have very long description. In real-world app it's probably a good idea to use collapsible container.
- Added option to remove products from cart using qty controls - if qty is 1 then "-" button turns into "del"
- Text overflow is handled correctly - for example product titles on PLP
- Empty states are handled - for example when cart has no products.
