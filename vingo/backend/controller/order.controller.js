import Shop from "../models/shop.model.js"
export const placeOrder = async (req, res) => {
    try {

        const { cartItems, paymentMethod, deliveryAddress } = req.body;

        if (cartItems.length == 0 || !cartItems) {
            return res.status(400).json({ message: "cart  is empty" })
        }
        if (!deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({ message: "send complete delivery  address" })
        }

        const groupItemByShop = {}

        cartItems.forEach(item => {
            const shopId = item.shop;
            if (!groupItemByShop[shopId]) {
                groupItemByShop[shopId] = [];
            }
            groupItemByShop[shopId].push(item)
        });


        const shopOrders = await Promise.all( Object.keys(groupItemByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner")

            if (!shop) {
                return res.status(400).json({ message: "shop  not found" })
            }

            const  items=groupItemByShop[shopId];

            const  subtotal=items.reduce((sum,i)=>sum+Number(i.price)*Number(i.quantity),0)

            return{
                shop:shop._id,
                owner:shop.owner._id,
                subtotal,
                shopOrderItems:items.map((i)=>({
                    items:i._id,
                    price:i.price,
                    quantity:i.quantity,
                    name:i.name
                }))
            }
        })
    )

    } catch (error) {

    }
}