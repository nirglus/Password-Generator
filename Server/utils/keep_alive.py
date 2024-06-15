import os
from apscheduler.schedulers.background import BackgroundScheduler
import requests
from dotenv import load_dotenv

load_dotenv()

scheduler = BackgroundScheduler()

def start_keep_alive():
    scheduler.start()

    def keep_alive_job():
        try:
            server_url = os.getenv('SERVER_URL')
            requests.get(f'{server_url}/password/keep-alive')
            print('Keep-alive request sent')
        except requests.RequestException as e:
            print(f'Error sending keep-alive request: {e}')

    scheduler.add_job(keep_alive_job, 'interval', minutes=2)

def stop_keep_alive():
    scheduler.shutdown()

start_keep_alive()
