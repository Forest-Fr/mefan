import os
from flask import Flask, request, jsonify
from ftplib import FTP
import subprocess

# ========== 配置项 ==========
REPO_URL = "https://github.com/Forest-Fr/mefan.git"  # GitHub 仓库 URL
CLONE_DIR = "./repo"                                 # 本地克隆目录
FTP_HOST = "ftpupload.net"                           # FTP 服务器地址
FTP_USER = "i0_38083790"                             # FTP 用户名
FTP_PASS = "99380VVV"                                # FTP 密码
FTP_DIR = "/htdocs/"                                 # FTP 上传目录

# 创建 Flask 应用
app = Flask(__name__)

def clone_or_update_repo():
    """
    克隆或更新 GitHub 仓库
    """
    try:
        if not os.path.exists(CLONE_DIR):
            subprocess.run(["git", "clone", REPO_URL, CLONE_DIR], check=True)
        else:
            subprocess.run(["git", "-C", CLONE_DIR, "pull"], check=True)
        print("Repository updated successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Failed to update repository: {e}")
        raise

def upload_files_to_ftp(local_dir, ftp_dir):
    """
    上传文件到 FTP
    """
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(user=FTP_USER, passwd=FTP_PASS)
        ftp.cwd(ftp_dir)

        for root, dirs, files in os.walk(local_dir):
            for file in files:
                file_path = os.path.join(root, file)
                with open(file_path, 'rb') as f:
                    ftp.storbinary(f"STOR {os.path.relpath(file_path, local_dir)}", f)
                    print(f"Uploaded {file} to FTP.")

        ftp.quit()
        print("All files uploaded to FTP successfully.")
    except Exception as e:
        print(f"Failed to upload files to FTP: {e}")
        raise

@app.route('/')
def home():
    """
    返回主页内容
    """
    return "Welcome to my Flask app on PythonAnywhere!"

@app.route('/webhook', methods=['POST'])
def webhook():
    """
    处理 Webhook 请求
    """
    if request.method == 'POST':
        data = request.json
        print("Received Webhook Data:", data)

        # 更新仓库
        try:
            clone_or_update_repo()
        except Exception as e:
            return jsonify({'error': f'Failed to update repository: {e}'}), 500

        # 上传到 FTP
        try:
            upload_files_to_ftp(CLONE_DIR, FTP_DIR)
        except Exception as e:
            return jsonify({'error': f'Failed to upload files to FTP: {e}'}), 500

        return jsonify({'message': 'Webhook processed and repository updated!'}), 200
    else:
        return jsonify({'error': 'Invalid method!'}), 400

# WSGI 服务器入口
application = app
