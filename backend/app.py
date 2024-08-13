from flask import request, jsonify
from config import app, db
from models import Product

@app.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    json_products = list(map(lambda x: x.to_json(), products))
    return jsonify({"products": json_products})

@app.route("/products/<int:id>", methods=["GET"])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    return jsonify(product.to_json())

@app.route("/products", methods=["POST"])
def create_product():
    name = request.json.get("name")
    description = request.json.get("description")
    price = request.json.get("price")
    quantity = request.json.get("quantity")

    if not name or not description or price is None or quantity is None:
        return (
            jsonify({"message": "You must include name, description, price, and quantity"}),
            400,
        )

    new_product = Product(name=name, description=description, price=price, quantity=quantity)
    try:
        db.session.add(new_product)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Product created!"}), 201

@app.route("/products/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({"message": "Product not found"}), 404

    data = request.json
    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.quantity = data.get("quantity", product.quantity)

    db.session.commit()

    return jsonify({"message": "Product updated."}), 200

@app.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({"message": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=False)
