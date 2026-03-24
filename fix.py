with open("tracker.html", "r") as f:
    text = f.read()
text = text.replace("today\\'s", "today\\'s")
text = text.replace("today\\\\'s", "today\\'s")
with open("tracker.html", "w") as f:
    f.write(text)
