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
        raise

def upload_files_to_ftp(local_dir, ftp_dir):
    """
    上传文件到 FTP
    """
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(user=FTP_USER, passwd=FTP_PASS)
        ftp.cwd(ftp_dir)

        # 遍历 repo 目录中的文件并上传
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
    访问根路径时返回 HTML 页面
    """
    return """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Flask Demo</title>
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
    if request.method == 'POST':
        data = request.json
        print("Received Webhook Data:", data)

        # FTP 配置
        FTP_HOST = "ftpupload.net"
        FTP_USER = "i0_38083790"
        FTP_PASS = "99380VVV"

        # 上传代码到 FTP
        try:
            ftp = FTP(FTP_HOST)
            ftp.login(user=FTP_USER, passwd=FTP_PASS)
            ftp.cwd('/htdocs')

            for root, dirs, files in os.walk('./repo'):  # 假设拉取的代码目录为 ./repo
                for file in files:
                    file_path = os.path.join(root, file)
                    with open(file_path, 'rb') as f:
                        ftp.storbinary(f'STOR {file}', f)
            ftp.quit()
            print("Files successfully uploaded to FTP!")
        except Exception as e:
            print(f"Error during upload: {e}")

        return jsonify({'message': 'Webhook processed successfully!'}), 200
    else:
        return jsonify({'error': 'Invalid method!'}), 400


if __name__ == "__main__":
    # 启动 Flask 应用
    app.run(host='0.0.0.0', port=5001, debug=True)
