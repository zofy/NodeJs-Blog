#RESTful blog

Simple blog developed on cloud9 using NodeJs(express) and Mongo in the background.
HTTP routes follow RESTful pattern, so we have:

####index

contains all blog posts

####show

shows specific post

####new 

form for creating new post

####edit 

update and save specific blog post

####delete

deletes a specific blog post


App contains express-sanitizer so users can upload formatted blog content. 
Besides that, thanks to method-override we could implement PUT and DELETE requests.