# OharaRaidBuilder

Goal is to create a Discord Bot, which is able to post an event sign-up form, with roles, dates, special markers, etc.


# TODO List:
- Remove and backup unnecessary stuff (old commands)
- Decide if thumbnail should be a choice, or url input
  - Url input is simpler to program, harder to use
  - Choice is easier to use, harder to program, needs extra stuff
    - Store thumbnail picture options in file database
    - Create a command to add picture options
    - Modify raidbuilder command to accomodate for dynamically read picture urls and names
- Command to use dynamic role numbers (embed fields), with dynamic emoji. Optional string option, format :emoji:Name. Put emoji on button.
- console or chat log to see who signed up when, etc

- DM questions for building event:
  - Post a sample embed, which will be modified with the answers of the question
  - Post questions, await answers, modify embed based on answer
  - Provide editing opportunities for the individual parts of the embed.
  - 
