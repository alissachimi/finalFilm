from flask import Flask, send_file, render_template, request, redirect, session, send_from_directory

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if(request.method=='POST'):
        #do something
        print('hi')
    
    return render_template('home.html')

@app.route('/maps')
def maps():
    return render_template('maps.html')

@app.route('/game')
def game():
    return render_template('game.html')


if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=80)