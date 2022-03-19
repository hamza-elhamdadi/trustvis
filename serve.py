from flask import Flask, request, send_file
from generate_data import generate_data
import os, json#, pymysql

app = Flask(__name__)

#connection = pymysql.connect(
#    host='localhost',
#    user='admin',
#    password=
#)

@app.route('/')
def index():
    return send_file('index.html')

@app.errorhandler(404)
def page_notfound(error):
    print('Error: ' + str(error))
    return 'This page does not exist', 404

@app.route('/get-data', methods=['GET'])
def fetch():
    return json.dumps(generate_data(float(request.args.get('correlation'))))

@app.route('/is-id-unique', methods=['GET'])
def id_unique():
    user_id = request.args.get('id')
    ids = os.listdir('responses')

    return json.dumps(not user_id in [id.split('.')[0] for id in ids])

@app.route('/save-data', methods=['POST'])
def save_data():
    input_json = request.get_json(force=True)

    print('data from client: ', input_json)

    with open(f"responses/{input_json['prolific-id']}.json", 'w') as file:
        json.dump(input_json, file, ensure_ascii=False, indent=4)
    
    return json.dumps('\{"file saved"\}')

@app.route('/user-number', methods=['GET'])
def get_num_users():
    with open('static/metadata/ids.json', 'r') as file:
        lines = file.readlines()

    if len(lines) <= 0:
        user_num = 0
    else:
        user_num = lines[0]
        user_num = int(user_num) if int(user_num) != None else 0

    with open('static/metadata/ids.json', 'w') as file:
        file.write(str(user_num+1))
    return json.dumps({"user_num": user_num })

@app.route('/get-conditions', methods=['GET'])
def get_conditions():
    with open('static/data/conditions.json') as file:
        return json.dumps(json.load(file))

@app.route('/set-conditions', methods=['POST'])
def set_conditions():
    input_json = request.get_json(force=True)

    print('data from client: ', input_json)

    if input_json['conditions'] == []:
        input_json['conditions'] = ['blur', 'transparency', 'outline', 'grid-lines', 'scale', 'overlap']

    with open('static/data/conditions.json', 'w') as file:
        json.dump(input_json, file, ensure_ascii=False, indent=4)

    return json.dumps('\{"conditions updated"\}')