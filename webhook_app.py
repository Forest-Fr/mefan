import os
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        # 打印接收到的 Webhook 数据
        data = request.json
        print("Received Webhook Data:", data)

        # 拉取远程代码
        os.system('cd /cd /home/oliver128/flask_app && git pull origin main')

        return jsonify({'message': 'Webhook received and repository updated!'}), 200
    else:
        return jsonify({'error': 'Invalid method!'}), 400

if __name__ == '__main__':

# ========== 配置项 ==========
REPO_URL = "https://github.com/Forest-Fr/mefan.git"  # GitHub 仓库 URL
CLONE_DIR = "./repo"                                 # 本地克隆目录
FTP_HOST = "ftpupload.net"                           # FTP 服务器地址
FTP_USER = "if0_38083790"                            # FTP 用户名
FTP_PASS = "99380VVV"                                # FTP 密码
FTP_DIR = "/htdocs/"                                 # FTP 上传目录

app = Flask(__name__)

def clone_or_update_repo():
    """
    克隆或更新仓库
    """
    try:
        if not os.path.exists(CLONE_DIR):
            subprocess.run(["git", "clone", REPO_URL, CLONE_DIR], check=True)
        else:
            subprocess.run(["git", "-C", CLONE_DIR, "pull"], check=True)
        print("Repository updated successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Failed to update repository: {e}")
        abort(500)

def upload_files_to_ftp():
    """
    上传文件到 FTP
    """
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(user=FTP_USER, passwd=FTP_PASS)
        ftp.cwd(FTP_DIR)

        # 遍历 repo 目录中的文件并上传
        for root, dirs, files in os.walk(CLONE_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                with open(file_path, 'rb') as f:
                    ftp.storbinary(f"STOR {file}", f)
                    print(f"Uploaded {file} to FTP.")

        ftp.quit()
        print("All files uploaded to FTP successfully.")
    except Exception as e:
        print(f"Failed to upload files to FTP: {e}")
        abort(500)

@app.route('/')
def home():
    """
    访问根路径时，直接返回一个多行字符串形式的 HTML
    """
    return """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Flask Single-File Demo</title>
</head>
<body>
    <h1>Flask app is running on port 5001!</h1>
    <p>这是一个简单示例，所有的逻辑与页面都整合在了同一个 Python 文件中。</p>
    <p>如果你想拉取 GitHub 仓库并上传到 FTP，可以使用 /webhook 路由（POST）。</p>
</body>
</html>
    """

@app.route('/webhook', methods=['POST'])
def webhook():
    """
    GitHub Webhook 或手动触发
    1. 更新仓库
    2. 上传到 FTP
    """
    try:
        clone_or_update_repo()
        upload_files_to_ftp()
        return "Repository updated and files uploaded successfully.", 200
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == "__main__":
    # 启动 Flask 应用，监听 0.0.0.0:5001
    # 0.0.0.0 表示外部可以访问，如果只是本地开发可改成 127.0.0.1
    app.run(host='0.0.0.0', port=5001, debug=True)
