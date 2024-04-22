# Frontend Challenge Submission

## Assessment

Please build a web app using [Create Next App](https://nextjs.org/docs/api-reference/create-next-app) which should have 2 pages:

- **Transactions**
  - Should be a dynamic route based on an address hash. Please support Ethereum and Polygon addresses. You can use Etherscan or Polygonscan to find sample address(es).
    - Should default to a sample address hash for this demo.
  - Should list all the transactions of the address to show the `amount`, `timestamp` (formatted to human readable), `a link to see more details`, and any other details that you find relevant. If there are hundreds of transactions feel free to limit it to less than 100.
  - Should show the address’ `current balance`.
  - Should allow for the user to `sort the data` by amount or timestamp.
- **Transaction details**
  - Should be a dynamic route based on a transaction hash. Please support Ethereum and Polygon transactions. You can use Etherscan or Polygonscan to find sample hash(es).
  - Should show the `transaction hash with a link` to a block explorer (Etherscan, Polygonscan, or others).
  - Should show the `amount`, `timestamp` (formatted to human readable), `confirmation status` of the transaction (loading, successful, failed), the `transaction fee` if/when the transaction is successful, and any other details that you find relevant.

## Evaluation Criteria

- This assessment should take no more than 2 hours. We’re looking to get an understanding of how you code. We are not looking for a fully polished application that has no bugs.

## Run the app

1. Clone the repository.
2. Ensure Node.js is installed.

### Development Commands

Run the development server:

- `yarn && yarn dev` (for development)
- `yarn start` (for production)

## Tools and Technologies Used

- **Shadcn-UI:** My go-to for initializing UI components and defining the application layout.

- **TailwindCSS:** Employed for Atomic design, custom styling and responsive design.

- **Next.js SSR (Server-Side Rendering):** For efficient data fetching and improved performance through caching.

- **React Hooks and Custom Hooks:** For state management on the client side.

## Requirements Fulfilled:

- **Transactions**
  - Page Defaults to a specified sample address
  - Overview section shows the address’ `current balance`.
  - List of all transactions with required details and pagination
  - Sorting by Timestamp and Amount
- **Transactions details**

  - Dynamic route based on a transaction hash showing required details
  - Link to etherscan block explorer.

  Clicking on the Transaction Hash opens up the details page of that hash as required and there's a link to the etherscan explorer for the selected hash

## Core Features and Enhancements

- **Enhanced Data Fetching:** and Caching with Next.js SSR: Using Next.js SSR, ensured the Transactions data not only loads fast but is also cached efficiently. This means smoother browsing, enhancing the user experience significantly.

- **Pagination and Navigation:** Implemented a pagination system to manage content display, allowing users to navigate through Transaction lists efficiently.

- **Advanced Search Functionality:** For the search functionality, I opted for the search on search-button-click. Regex validation was also used to ensure the address input is validated.

- **Tooltip Information Preview:** A tooltip feature provides users with a quick view of from and to address details on hover.

- **Notification System and Error Handling:** Toast notification to inform the user of client-side error states like incorrect input and fetch errors.

- **Mode Switcher:** To switch between light and dark modes.

- **Loading State:** Used a skeleton component to handle data loading state.

## Deploy

App Currently Deployed to Vercel: [](https://)
