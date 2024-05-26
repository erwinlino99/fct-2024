from flask import Flask,jsonify,request
from flask_mysqldb import MySQL
from config import config
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 
conection=MySQL(app)

@app.route('/')
def index():
    return "API DE ERWIN"

@app.route('/users',methods=['GET'])
def listUsers():
    try:
        cursor=conection.connection.cursor()
        sql="SELECT * from users"
        cursor.execute(sql)
        dates=cursor.fetchall()
        return jsonify(dates)
    except Exception as e:
        return e
    
@app.route('/products',methods=['GET'])
def listProduct():
    try:
        cursor=conection.connection.cursor()
        sql="SELECT * from products"
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        products = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return jsonify(products)
    except Exception as e:
        return e
    
@app.route('/products/<int:id>', methods=['GET'])
def bringProduct(id):
    try:
        cursor = conection.connection.cursor()
        sql = f"SELECT * FROM products WHERE id = {id}"
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        # DE ESTA FORMA SE PUEDEN VER CLAVE-VALOR
        products = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return jsonify(products)
    except Exception as e:
        return str(e)
    
@app.route('/products', methods=['POST'])
def addProduct():
    try:
        # Obtener los datos del producto del cuerpo de la solicitud JSON
        product_data = request.json
        # Conectar a la base de datos
        cursor = conection.connection.cursor()
        # Construir y ejecutar la consulta SQL de inserción
        sql = "INSERT INTO products (name, category, price, stock) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (product_data['name'], product_data['category'], product_data['price'], product_data['stock']))
        # Confirmar la accion de que se ha metido en la BBDD
        conection.connection.commit()
        cursor.close()
        return "Productor registrado correctamente"
    except Exception as e:
        return str(e)


# HAY QUE VERIFICAR QUE ESE PRODUCTO EXISTE -->
@app.route('/products/<int:id>', methods=['DELETE'])
def removeProduct(id):
    try:
        cursor = conection.connection.cursor()
        sql = "DELETE FROM products WHERE id = %s"
        cursor.execute(sql, (id,))
        conection.connection.commit()
        cursor.close()
        return "Producto eliminado correctamente."
    
    except Exception as e:
        return str(e)
    
@app.route('/products/<int:id>', methods=['PUT'])
def updateProduct(id):
    try:
        new_price = request.json.get('price')
        cursor = conection.connection.cursor()
        
        sql = "UPDATE products SET price = %s WHERE id = %s"
        cursor.execute(sql, (new_price, id))
        conection.connection.commit()
        cursor.close()
        return "Precio del producto actualizado correctamente."
    
    except Exception as e:
        # En caso de error, devolver el mensaje de error
        return str(e)


# Cuando un endopint no existe -->
def not_found(error):
    return "<h1>Esta pagina no existe manin</h1>",404

if __name__ == '__main__':
    app.config.from_object(config['dev'])
    app.register_error_handler(404,not_found)
    app.run()
