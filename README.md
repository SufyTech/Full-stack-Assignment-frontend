# CourtBook - Sports Court Booking Platform

CourtBook is a web application that allows users to book badminton courts, optional equipment, and coaches with real-time availability. It supports dynamic pricing, admin management, and waitlist handling, making it easy to manage sports facility bookings efficiently.

## Features

- Multi-resource booking (court + equipment + coach)
- Dynamic pricing based on peak hours, weekends, and indoor courts
- Admin panel to manage courts, equipment, coaches, and pricing rules
- Booking history and live price updates
- Waitlist handling for fully booked slots

## Setup Instructions

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

Backend runs on `http://localhost:5000` (or your chosen port).

4. Seed the database:

```bash
node seed.js
```

This populates the database with:

- Courts
- Equipment
- Coaches
- Pricing rules

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Assumptions

- Booking duration is 1 hour per slot
- Prices are calculated per hour
- Equipment and coach availability are checked in real-time
- If a slot is full, users are added to a waitlist
- Pricing rules are configurable and stackable

## Database Design and Pricing Engine

The CourtBook platform is designed to manage courts, equipment, coaches, bookings, and pricing rules efficiently. The core database entities include:

- **Court**: Stores attributes like name, type (indoor/outdoor), and active status.
- **Equipment**: Stores name, total quantity, price per hour, and booked slots.
- **Coach**: Includes hourly rate, active status, and booked slots for each date and time.
- **Booking**: References courts, equipment, and coaches via ObjectIds, ensuring atomic bookings — all selected resources are reserved together, or the booking fails.
- **Waitlist**: Maintained per court, date, and slot to handle full bookings and promote the next user when a slot opens.

This schema ensures efficient availability checks. When a user attempts a booking, the system validates the court, equipment, and coach availability. Equipment and coach schedules are updated immediately upon confirmation to prevent double bookings.

The pricing engine is dynamic and configurable. Each court has a base price depending on its type: indoor courts carry a premium, while outdoor courts are lower. Additional costs from selected equipment and coaches are added to this base. Configurable rules, such as peak hour surcharges (6–9 PM), weekend multipliers, and indoor court premiums, are stored in the database. Each rule contains conditions and multipliers applied sequentially to calculate the total price. Administrators can adjust rates, enable/disable rules, or add new rules without changing backend code.

By separating booking logic from pricing logic, CourtBook ensures modularity, maintainability, and flexibility. Queries are optimized to handle multiple resource types, and the waitlist system ensures smooth user experience even when slots are fully booked. Combining atomic booking, dynamic pricing, and configurable rules, CourtBook provides a reliable and scalable solution for sports facility management.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React.js
- **Other**: Axios, Mongoose
