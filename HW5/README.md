HW5
# 6.Use ChatGPT/Copilot/Gemini/Claude to create something similar and write a reflection paper on your experience.



I used Copilot/GPT to assist me in some of the syntax & troubleshooting mostly. 
When it came to prompting it to do the requirements and the introduction, the structure of the code that was generate was very good, in many attempts. sometimes it would give me the js/css in a different file, sometimes it would write it directly into the html. It always chose to use css to make a grid for the display, although one could make multiple divisions within html to do so as well.
There was ocassionally confusion within some prompts as I think it had to do with the requirement and the initial introduction having different sized arrays (10 and 12).
Another thing that I thought was interesting is that the code was mostly the same as mine, but the main difference between all the outputs from the genAI was the way that it randomized the images in those arrays. Sometimes it would use a for loop with a decrement, sometimes it would use a while loop ect. 
I didn't like the way my randomize function looked when I tried it out, so I took inspiration from some of the various outputs that genAI gave, I ended up using an algorithm, or one similar to Fischer-Yates shuffle. (my randomize function is commented out at the bottom of my script.js)

My script was working fine and running with no errors. Everything was displaying correctly, but on top of asking Copilot/GPT to generate the hw for me, I also asked it to review my assignement and it came back telling me that there could be a possible issue which I would have otherwise overlooked : "script.js runs before the HTML is fully loaded, document.getElementById(imageTags[i]) will eventually return null, causing an error. "
Which fully makes sense, and the fix it prorposed was wrapping the script inside of "window.onload" to ensure it executes after the DOM is loaded.
```
window.onload = function () {
    for (var i = 0; i < imageTags.length; i++) {
        document.getElementById(imageTags[i]).src = backOfCard;
    }
    randomizeImages(); // Ensures images are randomized after the page loads
};
```
It highlighted potential issues, but it was already something I had thought of beforehand so it ends up not being very useful.

I think the speed of the tool in being able to provide quick feedback is fantastic for reducing the time needed to go and research syntax or debugging errors that are overlooked by not paying enough attention to them while you're focusing on an important piece of logic.
Having to go through a site with documentation to very common syntax can often be really time consuming and more often than not the explanation is quite accurate to that of the documentation.
So in that sense it is a great learning aid, and I think these are some of the main strengths of 'AI'.

Overall, using these tools to develop this assignment in particular posed no real issue from a technical point of view, it was able to fulfill requirements most of the time. Sometimes  I think it is more important to be able to understand the code and logic well, because otherwise things can quickly become ineffeciant, or unecessary. It is a fantastic tool for troubleshooting, checking for syntax, explaining concepts, logic or providing examples to problems. As I've mentioned before it's great for snippets of code as opposed to larger projects as it lacks context awareness the more you ask of it.