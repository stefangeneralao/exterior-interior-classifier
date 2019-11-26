import requests
import os

def download_file(url):
  local_filename = url.split('/')[-1]
  with requests.get(url, stream=True) as r:
    r.raise_for_status()
    with open('uploads/' + local_filename, 'wb') as f:
      for chunk in r.iter_content(chunk_size=8192): 
        if chunk:
          f.write(chunk)
  return local_filename

def delete_file(path):
  os.remove(path)