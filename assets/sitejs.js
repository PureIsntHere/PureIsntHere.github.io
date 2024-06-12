//Dynamic random site title
window.addEventListener("load", () => {
    const titles = ["Down the rabbithole, Alice", "Lets take a trip","Did you see that?", "hi.. Im Pure.", "Something creative here...","Hello world!","I can see you too!","Yes, its a dmc reference","Beware the jabberwock"]
    var item = titles[Math.floor(Math.random()*titles.length)];
    document.title = item;
    console.log("Page Loaded.")
});

