
# coding: utf-8

# In[2]:
import json

from google.cloud import vision
#GOOGLE_CLOUD_PROJECT='ScottCloudVision'
#GOOGLE_APPLICATION_CREDENTIALS ='AIzaSyDnic7qAdzpA6PPzP77GFf7rm4qi6JVidg'
#GOOGLE_APPLICATION_CREDENTIALS = "GOOGLE_APPLICATION_CREDENTIALS"

client = vision.Client()
print("c1")
#with open('C:/Users/admin/Documents/GitHub/sukosuko1.github.io/IMG_2755.jpg', 'rb') as image_file:

with open('IMG_2755.jpg', 'rb') as image_file:
    content = image_file.read()

image = client.image(content=content)
labels = image.detect_labels()
print('Labels:')

for label in labels:
    print(label.description)    

notes = image.detect_web(limit=4)

if notes.pages_with_matching_images:
    print('\n{} Pages with matching images retrieved')

    for page in notes.pages_with_matching_images:
        print('Score : {}'.format(page.score))
        print('Url   : {}'.format(page.url))

if notes.full_matching_images:
    print ('\n{} Full Matches found: '.format(
           len(notes.full_matching_images)))

    for image in notes.full_matching_images:
        print('Score:  {}'.format(image.score))
        print('Url  : {}'.format(image.url))

if notes.partial_matching_images:
    print ('\n{} Partial Matches found: '.format(
           len(notes.partial_matching_images)))

    for image in notes.partial_matching_images:
        print('Score: {}'.format(image.score))
        print('Url  : {}'.format(image.url))

if notes.web_entities:
    print ('\n{} Web entities found: '.format(len(notes.web_entities)))

    for entity in notes.web_entities:
        print('Score      : {}'.format(entity.score))
        print('Description: {}'.format(entity.description))

print(notes)

print("end")

