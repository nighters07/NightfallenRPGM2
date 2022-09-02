#==============================================================================
# Text Sound Effect (version 2)
# NEW FEATURE: Switch to turn off sound effect
#------------------------------------------------------------------------------
# by Zerbu
#==============================================================================
module Text_Sound_Effect
  #--------------------------------------------------------------------------
  # Options
  #--------------------------------------------------------------------------
  # The sound effect to play
  MESSAGE_SOUND = {
    0 => RPG::SE.new("Knock", 70, 80),
    1 => RPG::SE.new("Cursor1", 70, 80),
    2 => RPG::SE.new("Cursor2", 70, 80),
  }

  # ID of the Variable that stores the current sound
  SOUND_VAR = 1
  # The number of characters to display before each time the sound plays
  # The default is 3, it's recommended you keep it as this unless you
  # know what you're doing
  MESSAGE_SOUND_FRAMES = 3
  # Switch to disable sound effect
  # If you need to turn off the sound effect for any part of the game,
  # turn this switch on
  MESSAGE_SOUND_DISABLE = 2
end
class Window_Base < Window
  include Text_Sound_Effect
  #--------------------------------------------------------------------------
  # alias method: process_characer
  #--------------------------------------------------------------------------
  alias textsound_process_character_normal process_character
  def process_character(c, text, pos)
    if !$game_switches[MESSAGE_SOUND_DISABLE]
	   #---
	   if !defined?(@sound_frames)
	   @sound_frames = 0
	   end
	   #---
	   if @sound_frames == 0
	   MESSAGE_SOUND[$game_variables[SOUND_VAR]].play
	   end
	   #---
	   @sound_frames+=1
	   #---
	   if @sound_frames == MESSAGE_SOUND_FRAMES
	   @sound_frames = 0
	   end
	   #---
    end
    textsound_process_character_normal(c, text, pos)
  end
  #---
end