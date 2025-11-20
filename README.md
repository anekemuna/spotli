# Web Development Final Project - *Spotli*

Submitted by: **Munachimso Aneke**

This web app: **Find friends for your next hangout with Spotli. A social meet-up web app built with React + Vite that lets users discover local events, connect with people with similar interests, and share photos or updates from the events they attend**

Time spent: **25** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [ ] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [x] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [x] Users can add more characterics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [x] Enabled RLS policies, and used Supabase Authentication Features.

## Video Walkthrough

Here's a walkthrough of implemented user stories:


[![Walkthrough](https://img.youtube.com/vi/P9nKlVhHMss/0.jpg)](https://www.youtube.com/watch?v=P9nKlVhHMss)


Walkthrough Link: [https://youtu.be/P9nKlVhHMss]

Walkthrough created with:
[Youtube](https://www.youtube.com/)
<!-- 
<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' /> -->

<!-- Replace this with whatever GIF tool you used! -->
<!-- GIF created with ...   -->
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->
<!-- 
https://youtu.be/P9nKlVhHMss -->

## Notes

Describe any challenges encountered while building the app.
- Initially starting was hard. Coming up with an idea, deciding a name, mapping out the user journey, and choosing colors.
- The next challenge was deciding my database schema, including the columns to include, the foreign keys, and constraints.
- I also struggled with RLS policy for my profiles table. I was trying setup my authentication process so that when a user signs up, a username and user id is added to the profiles table. I put the insert command in the sign up function, but that violated RLS policy. After several back and forths, I realzed I needed to make a trigger function on Supabase.
- I tried making a PostForm component, so I can reuse it on both Create and Edit pages, but I had issues prepopulating it for edit (without affecting create), so I had to duplicate the component and rename it for edit.

## License

    Copyright [2025] [Munachimso Aneke]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
