# **ASCII_RPG**
The game as such is not completely thought out. I hope I'll get ideas while working on it. but the basics are:

*Browser visual version of dungeon and dragons, so the main subgenres are idle roguelike. There will be multiple campsites serving as main signposts from which you could go do any activity like fishing, woodcutting, crafting, helping the natives, going on some kind of adventure, or to dungeon. It should all be take place in fictional magical world. So there would be races like elves, dwarf, orcs, goblins and many more. Also you would have either limited lives or just one and after that you would have to be reborn and start again with nothing.*
## Technology
- I'm interested more into programming then designing levels, so I chose ascii theme, which should be basic enough to make designs, but for that I would need some kind of editor(so I won't have to "draw" it in code in array), which would give me wanted designs.

- Almost everything (except user interactive elements) would be rendered into canvas element for it's extreme performance, but there's a price for that performance and that it's pretty hard to code, because after you draw anything to canvas, you don't have almost any access to it, the only thing you can get back from canvas is where you clicked and on which color, but I would be using react class components, so those will make it easier, because they allow me to make classes inside a javascript, from which I would be able to save the properties of objects before drawing and then modify them after.


## **Editor**
I'll be needing some kind of editor, so I can draw myself some animations, or some textures.
### Important needs
- **Multiple frames** => so you could make either drawing/animation
- **Import & export** => be able to either export or import any drawing/animation
- **Fast user input** => it would be in React, so it would render a lot, so some kind of optimalization would have to be done
- **Responsive canvas** => be able to draw/display animations on different devices for same result
- **Color change** => it's mandatory to make the animations colorful to have better understanding of what's going on in the frame
- **Font size** => need to calculate the font height from canvas height for ability to connect pixels

### Great features to have
- **Ghosting** => display previous frame with lesser opacity, for easier drawing (don't have to remember where the pixels were to make another frame)
- **Access to all animations** => be able to edit any animation at any time by just some simple clicks and not have to go into the exact files to copy the animation
- **Local storage** => after refresh be able to show the unfinished animation, so it wouldn't be lost, also it should be able to save control settings, better then cookies for it's bigger storage
- **Arrow keys** => can switch pixel focus with arrow keys for faster drawing


## **My vars & predetermined props**
#### Pixel
Tile, in which one ascii character is stored, it's size is calculated based on resolution to make it responsive
#### Loot
F.e. armor, sword etc., with custom size of pixels, offsets and custom abilities
#### Player
Player itself, move based on player input, customize character (custom size, color, abilities)
#### Monster
Monster with simple AI, if any, random stats, loot, size, abilities and type
#### Entity
Any entity added to world, f.e. player, monster, loot etc. should handle basic drawings and actions
#### WorldEntities
Objects added to world, like Caves, fences, trees etc.

## Example
### Inventory dynamic structure
![Inventory structure](https://i.imgur.com/CHHix5N.png)
### Example from editor
![Template from editor](https://i.imgur.com/4FiEOs2.gif)
### Inventory from game
![Inventory from game](https://i.imgur.com/as5oGb3.gif)
### Collision canvas from game
![Collision canvas from game](https://i.imgur.com/ZXaGQ9Y.png)

