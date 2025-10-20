import requests
import time

def test_backend():
    """Test if the Flask backend is running"""
    try:
        response = requests.get('http://localhost:5000/api/health', timeout=5)
        if response.status_code == 200:
            print("[OK] Flask Backend is running!")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"[ERROR] Backend responded with status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("[ERROR] Flask Backend is not running or not accessible")
        return False
    except Exception as e:
        print(f"[ERROR] Error testing backend: {e}")
        return False

def test_mobile_app():
    """Test if Expo is running"""
    # Try both common Expo ports
    ports = [8081, 3000, 19006]
    for port in ports:
        try:
            response = requests.get(f'http://localhost:{port}', timeout=5)
            if response.status_code == 200:
                print(f"[OK] Expo Development Server is running on port {port}!")
                return True
        except requests.exceptions.ConnectionError:
            continue
        except Exception as e:
            continue
    
    print("[ERROR] Expo Development Server is not running on any common port")
    return False

def test_web_app():
    """Test if Vite dev server is running"""
    try:
        response = requests.get('http://localhost:5173', timeout=5)
        if response.status_code == 200:
            print("[OK] Web Development Server is running!")
            return True
        else:
            print(f"[ERROR] Web server responded with status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("[ERROR] Web Development Server is not running")
        return False
    except Exception as e:
        print(f"[ERROR] Error testing web server: {e}")
        return False

if __name__ == "__main__":
    print("Medi-AI Suite Status Check")
    print("=" * 40)
    
    backend_running = test_backend()
    mobile_running = test_mobile_app()
    web_running = test_web_app()
    
    print("\n" + "=" * 40)
    print("Summary:")
    print(f"Backend (Flask): {'[OK] Running' if backend_running else '[ERROR] Not Running'}")
    print(f"Mobile (Expo): {'[OK] Running' if mobile_running else '[ERROR] Not Running'}")
    print(f"Web (Vite): {'[OK] Running' if web_running else '[ERROR] Not Running'}")
    
    if backend_running and mobile_running and web_running:
        print("\n[SUCCESS] All services are running! Medi-AI Suite is ready!")
    else:
        print("\n[WARNING] Some services are not running. Check the logs above.")
