import { createCar } from "@/lib/redis";

export default async function handler(req, res) {
    try {
        const id = await createCar(req.body);
        res.status(200).json({ id });
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({
            message: "Something went wrong :("
        });
    }
}