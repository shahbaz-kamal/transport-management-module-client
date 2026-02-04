<div align="center">
  <img height="400" src="https://github.com/shahbaz-kamal/vaultPay-server/blob/development/src/app/assets/git_banner.png"  />
</div>

###

## 🚌 Transport Management Module

The **Transport Management Frontend** provides a clean and intuitive interface for managing and viewing student transport information. Built with a component-driven architecture, it delivers a smooth experience for both **admins** and **students**, ensuring clarity, usability, and responsiveness across devices.

Admins can efficiently assign routes, vehicles, and pickup points, while students can easily view their **current month transport fee** and **assigned transport details** in real time. The UI is designed to show only relevant information based on user role and assignment status.

## 🔧 Installation Guidline:

###

1. First clone the backened by running

```bash
  git clone https://github.com/shahbaz-kamal/transport-management-module-server.git
```

2. Change your directory to the cloned folder by

```bash
  cd transport-management-module-server
```

3. Follow the instruction mentioned in the vackend repository `https://github.com/shahbaz-kamal/transport-management-module-server.git` and run the projects

4. clone the frontend by running

```bash
  git clone https://github.com/shahbaz-kamal/transport-management-module-client.git
```

5. Change your directory to the cloned folder by

```bash
  cd transport-management-module-client
```

6. Run the following to install dependencies:

```bash
npm install
```

7. Create a .env file or rename .env.example to .env in root directory of the project and add the following variable :

```bash
VITE_BASE_URL=http://localhost:5000/api/v1


```

5. Run the following command to run the project:

```bash
npm run dev
```

<!-- ## 🔗 Live  link

###

[Click Here](https://vaultpay-by-shahbaz.netlify.app)
## 🔗 Backend  link

###

[Click Here](https://vault-pay-server.vercel.app) -->

## 👨‍💼 Login Info(For testing)

- **Super Admin Email** — super.transport@gmail.com
- **Super Admin Password** — 123456Aa

- **Student Email** — student1@gmail.com
- **Student Password** — 123456Aa

- Or you can create your own credentials from login page

## ✨ Frontend Features

- **Role-Based UI Rendering** — Separate experiences for **Admin** and **Student**
- **Responsive Dashboard Layout** — Optimized for desktop and tablet screens
- **Dynamic Transport Assignment Modal** — Assign routes, vehicles, and pickup points in a single flow
- **Real-Time Data Binding** — Instantly reflects assignment and fee updates
- **Student Dashboard View**
  - Current month fee information
  - Assigned route, vehicle, and pickup point details
- **Conditional UI Logic** — Transport details are hidden when no route is assigned
- **Reusable UI Components** — Modular components for dialogs, cards, and layouts
- **Protected Routes** — Client-side route protection based on authentication and role
- **Clean UX** — Minimal, readable layouts with clear status indicators

## 🛠 Technology Used

###

 <div align="left">

   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" height="40" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height="40" alt="redux logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
   <img src="https://i.ibb.co/d4nbSTwp/shadcn-ui-logo-png-seeklogo-519786.png" height="40" alt="shadcn logo logo"  />
    <img width="12" />


</div>

## 💥 Dependencies:

```json
{
  "@hookform/resolvers": "^5.2.2",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-label": "^2.1.8",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-separator": "^1.1.8",
  "@radix-ui/react-slot": "^1.2.4",
  "@radix-ui/react-tooltip": "^1.2.8",
  "@reduxjs/toolkit": "^2.11.2",
  "@tailwindcss/vite": "^4.1.18",
  "axios": "^1.13.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.563.0",
  "next-themes": "^0.4.6",
  "radix-ui": "^1.4.3",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.71.1",
  "react-icons": "^5.5.0",
  "react-redux": "^9.2.0",
  "react-router": "^7.13.0",
  "sonner": "^2.0.7",
  "tailwind-merge": "^3.4.0",
  "tailwindcss": "^4.1.18",
  "zod": "^4.3.6"
}
```

## 💥Dev Dependencies:

```json
{
  "@eslint/js": "^9.39.1",
  "@types/node": "^24.10.9",
  "@types/react": "^19.2.5",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "globals": "^16.5.0",
  "tw-animate-css": "^1.4.0",
  "typescript": "~5.9.3",
  "typescript-eslint": "^8.46.4",
  "vite": "^7.2.4"
}
```

### Thank you:
