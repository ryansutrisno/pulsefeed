# PulseFeed
An elegant web application for discovering and viewing viral content from Instagram and Threads in a clean, unified feed.
[cloudflarebutton]
PulseFeed is a minimalist and visually stunning web application designed to aggregate and display trending and viral content from Instagram and Threads. It provides a seamless, curated experience for users to discover the most talked-about posts without the noise of their regular feeds. The application features a clean, card-based layout where each card represents a viral post, displaying the content, author information, engagement metrics, and source platform.
## API Integration & Mock Data: A Production-Grade UI Demonstration
This application serves as a production-grade UI/UX demonstration, utilizing a comprehensive, seeded mock dataset to simulate a live content feed. **Direct integration with live Instagram and Threads APIs is not feasible within this project's architecture.**
This approach was chosen for critical technical and security reasons:
-   **Security & Architectural Constraints:** Live API integration requires complex, server-side OAuth 2.0 flows and the secure storage and refreshment of client secrets and access tokens. The secure, serverless architecture of this project is optimized for high-performance edge computation and explicitly prohibits the backend infrastructure necessary for managing these sensitive, long-lived credentials.
-   **Stable & High-Performance Demo:** A static dataset ensures a consistent, fast, and reliable experience for all users, which is paramount for a demonstration environment. This avoids the complexities of live API rate limits, data inconsistencies, and potential downtime.
-   **Focus on Frontend Excellence:** The primary goal is to showcase a best-in-class user interface, fluid interactions, and a visually stunning frontend architecture. The mock data approach allows us to deliver on this goal without compromise.
The "Refresh Feed" feature simulates new content by shuffling the existing dataset, providing a dynamic feel while maintaining the performance and stability of the demonstration.
## Key Features
-   **Unified Feed:** View trending content from Instagram and Threads in one place.
-   **Minimalist UI:** A clean, card-based layout that prioritizes content.
-   **Advanced Filtering:** Filter posts by platform (All, Instagram, Threads).
-   **Sorting Options:** Sort the feed by what's currently 'Trending' or by the 'Newest' posts.
-   **Responsive Design:** A flawless experience on any device, from mobile phones to large desktops.
-   **High Performance:** Built on Cloudflare's edge network for exceptional speed and reliability.
## Technology Stack
-   **Frontend:** React, Vite, Tailwind CSS, shadcn/ui
-   **Backend:** Hono on Cloudflare Workers
-   **State Management:** Zustand
-   **Storage:** Cloudflare Durable Objects
-   **Styling & Animation:** Lucide React, Framer Motion
-   **Language:** TypeScript
## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
-   [Bun](https://bun.sh/) installed on your machine.
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for Cloudflare Workers development.
### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pulsefeed
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
## Development
To start the local development server, which includes both the Vite frontend and the Hono worker backend, run the following command:
```bash
bun dev
```
This will start the application, and you can view it in your browser at `http://localhost:3000`. The backend API will be available and proxied automatically.
## Project Structure
-   `src/`: Contains the frontend React application source code.
    -   `pages/`: Main pages of the application.
    -   `components/`: Reusable React components.
    -   `lib/`: Utility functions and API client.
-   `worker/`: Contains the Hono backend application for the Cloudflare Worker.
    -   `index.ts`: The entry point for the worker.
    -   `entities.ts`: Defines the data models and interactions with Durable Objects.
-   `shared/`: Contains shared TypeScript types used by both the frontend and backend.
## Deployment
This project is designed for easy deployment to Cloudflare's global network.
1.  **Login to Wrangler:**
    If you haven't already, authenticate Wrangler with your Cloudflare account:
    ```bash
    wrangler login
    ```
2.  **Deploy the application:**
    Run the deploy script, which will build the application and deploy it to your Cloudflare account.
    ```bash
    bun deploy
    ```
Alternatively, you can deploy your own version of this project with a single click.
[cloudflarebutton]
## Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request if you have any improvements or features to add.
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
## License
This project is licensed under the MIT License. See the `LICENSE` file for details.