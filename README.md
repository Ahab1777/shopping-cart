# Temdetudo Fake Shop

A simple e-commerce demo built with React, TypeScript, and Vite for [The Odin Project] (https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart).

## Features

- Browse and search products
- Add, remove, and update items in the cart
- Responsive layout for desktop and mobile
- Cart state saved in local storage
- Toast notifications for cart actions (and checkout attempt warning :grimacing:) — custom-built from scratch for this project

## Tools & Libraries

- React 19
- TypeScript
- Vite
- React Router DOM
- FontAwesome
- CSS Modules

## Project Structure

- **State:** Managed globally with React Context and a custom `useCart` hook.
- **Routing:** Handled with React Router DOM.
- **Components:** ProductCard, CheckoutProduct, Toast, FilterBar, ConfirmationModal.
- **Logic:** Uses memoization (`React.memo`, `useMemo`) and React Portals for modals and toasts.
