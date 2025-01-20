import express, { type Express, type Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import type { Order } from "./types";

let nextId = 2;
let tempOrders: Order[] = [];
let orders: Order[] = [
    {
        id: 1,
        drinks: [
            {
                brewer: "vifilfell",
                category: "beer",
                description: "Tasty beer",
                id: "some-uuid",
                imageSource: "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
                name: "Gylltur",
                price: 1000,
            },
        ],
        email: "example@gmail.com",
        count: 2,
        date: new Date(),
        totalPrice: 3000,
        food: [
            {
                id: "53051",
                category: "seafood",
                cousine: "Malaysian",
                description: "Delicious seafood dish from Malaysia.",
                imageSource: "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
                name: "Nasi lemak",
                price: 2000,
            },
        ],
    },
];

const api: Express = express();
api.use(cors());
api.use(express.json());
api.use(bodyParser.urlencoded({ extended: false }));
const port = 3001;

api.get("/api/orders", (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    const order = orders.find((order) => order.email === email);
    if (!order) {
        return res.status(404).json({ error: "Order not found." });
    }

    res.json(order);
});

api.post("/api/orders", (req, res) => {
    const order = req.body;

    if (!order || !order.email) {
        return res.status(400).json({ error: "Invalid order data." });
    }

    orders.push(order);
    console.log("Order saved:", order);
    res.status(201).json({ success: true });
});

api.post("/api/temp-order", (req, res) => {
    const { food, drinks, email } = req.body;

    if (!food || food.length === 0) {
        return res.status(400).json({ error: "At least one dish is required." });
    }

    const updatedFood = food.map((item: any) => ({
        ...item,
        description: item.description || "No description available",
        price: item.price || Math.floor(Math.random() * 1000) + 500,
    }));

    const tempOrder = {
        id: nextId++,
        email: email || "",
        food: updatedFood,
        drinks: drinks || [],
        count: 1,
        totalPrice: 0,
        date: new Date(),
    };

    tempOrders.push(tempOrder);
    console.log("Temporary order created:", tempOrder);
    res.status(201).json({ order: tempOrder });
});

api.put("/api/temp-order", (req, res) => {
    const { food, drinks } = req.body;

    const tempOrderIndex = tempOrders.findIndex((order) => !order.email);

    if (tempOrderIndex === -1) {
        return res.status(404).json({ error: "Temporary order not found." });
    }

    const updatedFood = food.map((item: any) => ({
        ...item,
        price: item.price || Math.floor(Math.random() * 1000) + 500,
    }));

    const updatedDrinks = (drinks || []).map((item: any) => ({
        ...item,
        price: item.price || Math.floor(Math.random() * 500) + 200,
        quantity: item.quantity || 1,
    }));

    tempOrders[tempOrderIndex] = {
        ...tempOrders[tempOrderIndex],
        food: updatedFood,
        drinks: updatedDrinks,
    };

    console.log("Updated temp order:", tempOrders[tempOrderIndex]);
    res.json({ success: true, order: tempOrders[tempOrderIndex] });
});

api.post("/api/finalize-order", (req: Request, res) => {
    const { id, email, count, date } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Temporary order ID is required." });
    }

    if (!email) {
        return res.status(400).json({ error: "Email is required to finalize the order." });
    }

    const tempOrderIndex = tempOrders.findIndex((order) => order.id === id);
    if (tempOrderIndex === -1) {
        return res.status(404).json({ error: "Temporary order not found." });
    }

    const tempOrder = tempOrders[tempOrderIndex];

    const foodPrice = tempOrder.food.reduce((acc, item) => acc + (item.price || 0), 0);
    const drinksPrice = tempOrder.drinks.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
        0
    );

    const totalPrice = foodPrice * count + drinksPrice;

    const finalizedOrder: Order = {
        ...tempOrder,
        email,
        count,
        date,
        totalPrice,
    };

    tempOrders.splice(tempOrderIndex, 1);
    orders.push(finalizedOrder);

    console.log("Order finalized:", finalizedOrder);
    res.json({ success: true, order: finalizedOrder });
});

console.log("Temp Orders State:", tempOrders);

api.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});