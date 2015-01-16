local Input = {}

Input.keys = {}
Input.buttons = {}
Input._mousePos = Vector( 0, 0 )
Input.wheel = 0
Input.isRunning = true

function Input.update()
  local mouseX, mouseY = love.mouse.getPosition()
  Input._mousePos = Vector( mouseX, mouseY )

  if love.event then
    love.event.pump()

    local _keys = {}
    local _btns = {}

    for e, a, b, c, d in love.event.poll() do
      if e == "quit" then
        Input.isRunning = false
      elseif e == "keypressed" then
        Input.keys[a] = 1
        _keys[ #_keys + 1 ] = a
      elseif e == "keyreleased" then
        Input.keys[a] = 0
        _keys[ #_keys + 1 ] = a
      elseif e == "mousepressed" then
        Input.buttons[c] = 1
        _btns[ #_btns + 1 ] = c

        if c == "wu" then
          Input.wheel = 1
        elseif c == "wd" then
          Input.wheel = -1
        end
      elseif e == "mousereleased" then
        Input.buttons[c] = 0
        _btns[ #_btns + 1 ] = c
      end

      love.handlers[e]( a, b, c, d )
    end

    for key, value in pairs( Input.keys ) do
      if value == 0 then
        local keyFound = false

        for i = 1, #_keys do
          if _keys[i] == key then
            keyFound = true
            break
          end
        end

        if not keyFound then
          Input.keys[ key ] = -1
        end
      elseif value == 1 then
        local keyFound = false

        for i = 1, #_keys do
          if _keys[i] == key then
            keyFound = true
            break
          end
        end

        if not keyFound then
          Input.keys[ key ] = 2
        end
      end
	  end

    for key, value in pairs( Input.buttons ) do
      if value == 0 then
        local keyFound = false

        for i = 1, #_btns do
          if _btns[i] == key then
            keyFound = true
            break
          end
        end

        if not keyFound then
          Input.buttons[ key ] = -1
        end
      elseif value == 1 then
        local keyFound = false

        for i = 1, #_btns do
          if _btns[i] == key then
            keyFound = true
            break
          end
        end

        if not keyFound then
          Input.buttons[ key ] = 2
        end
      end
	  end
  end
end

function Input.reset()
  Input.wheel = 0
end

function Input.pressed()
  for _, v in pairs( Input.keys ) do
    if v > 0 then
      return true
    end
  end

  return false
end

function Input.clicked()
  for _, v in pairs( Input.buttons ) do
    if v > 0 then
      return true
    end
  end

  return false
end

function Input.keyDown( key )
  return Input.keys[ key ] == 1
end

function Input.keyUp( key )
  return Input.keys[ key ] == 0
end

function Input.keyHeld( key )
  return Input.keys[ key ] == 2
end

function Input.mouseDown( button )
  return Input.buttons[ button ] == 1
end

function Input.mouseUp( button )
  return Input.buttons[ button ] == 0
end

function Input.mouseHeld( button )
  return Input.buttons[ button ] == 2
end

function Input.wheelUp()
  return Input.wheel == 1
end

function Input.wheelDown()
  return Input.wheel == -1
end

function Input.mousePos()
  return Input._mousePos
end

function Input.exit()
  Input.isRunning = false
end

function Input.running()
  return Input.isRunning
end

return Input
