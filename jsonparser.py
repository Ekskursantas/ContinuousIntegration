#!/usr/bin/python
import os
import sys
import json
list = []
notScript = True
def makeUrl(url):
	string = ""
	if url.endswith('.mp3'):
		string = "allAssets['"+url+"'] = 'arraybuffer';"
		list.append(string)
	elif url.endswith('.json'):
		with open("build/WebContent/assets/"+url) as json_file:
			data = json.load(json_file)
			path = os.path.dirname(url)
			if data.has_key('textures'):
				files = data['textures']
				for img in files:
					string = "allAssets['"+path+"/"+ img["image"] +"'] = 'blob';"
					list.append(string)
		string = "allAssets['"+url+"'] = 'text';"
		list.append(string)
	elif url.endswith('.atlas'):
		string = "allAssets['"+url+"'] = 'text';"
		list.append(string)
	elif url.endswith('.png'):
		string = "allAssets['"+url+"'] = 'blob';"
		list.append(string)
	elif url.endswith('.jpg'):
		string = "allAssets['"+url+"'] = 'blob';"
		list.append(string)

if __name__ == '__main__':
	assetList = open("build/assets.txt","w+")
	functionList = open("build/functions.txt","w+")
	sceneList = open("build/scenes.txt","w+")
	print 'test'
	print sys.argv[1]
	with open(sys.argv[1]) as json_file:
		data = json.load(json_file)
		files = data['section1']
		for f in files['files']:
			notScript = True
			functionString = ""
			sceneString = ""
			if f.has_key('url'):
				if f['type'] == 'audioSprite' or f['type'] == 'audio':
					makeUrl(f['url'][0].replace("assets/", ""))
					if f['url'][0].endswith('.js'):
						notScript = False
				else:
					makeUrl(f['url'].replace("assets/", ""))
					if f['url'].endswith('.js'):
						notScript = False
			elif f.has_key('urls'):
				jsonST = ""
				makeUrl(f['urls'][0].replace("assets/", ""))
				if f['urls'][0].endswith('.js'):
					notScript = False
			if f.has_key('jsonURL'):
				jsonST = f['jsonURL'].replace("assets/", "")
				string = "allAssets['"+jsonST+"'] = 'text';"
				list.append(string)
			if notScript:
				for props in f:
					if props == 'type':
						functionString = "this.load."+f[props]+"({" + functionString
					elif props == 'jsonURL':
						functionString += props+":ASSETLOADER['"+f[props].replace("assets/", "")+"'],"
					elif props == 'url':
						if f['type'] == 'audioSprite' or f['type'] == 'audio':
							functionString += props+":ASSETLOADER['"+f['url'][0].replace("assets/", "")+"'],"
						else:
							functionString += props+":ASSETLOADER['"+f['url'].replace("assets/", "")+"'],"							
					elif props == 'path':
						functionString +=  props+":'"+f[props].replace("assets/", "")+"/',"
					else:
						functionString +=  props+":'"+f[props].replace("assets/", "")+"',"
				functionString += "});"
				functionList.write(functionString)
			else:
				if f['type'] == 'sceneFile':
					sceneString = "this.scene.add('"+f['key']+"', "+f['key']+");";
					sceneList.write(sceneString)
	for i in list:
		assetList.write(i)
				