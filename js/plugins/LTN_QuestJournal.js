// =============================================================================
// LTN_QuestJournal.js
// =============================================================================
/*
 1.0. - Initial release
 1.0.1 - Auto select category bug fix when no active quest selected.
       - Fix for larger resolutions.
       - Updated default plugin parameters.
       - Removed console log
       - Fixed isStepComplete always returning false
*/

/*:
 @plugindesc v 1.0.1 A quest journal, highly customizable and easy to use.
<LTN_QuestJournal>
@author LTN Games

@param ================
@param  General
@param ================

@param Quest State Colors
@desc The color the quest name font should change to when status has changed.
@default failed: 18, complete:  3, active: 16, started: 0

@param Objective State Colors
@desc The color the objective name font should change to when status has changed.
@default failed: 18, complete:  3, active: 16, started: 0

@param Reward Icons
@desc The icon you want to use when you have a 'gold' or 'exp' reward.
@default gold: 208, exp: 126

@param Auto Complete Quests
@desc Choose to auto complete quests when a quests last objective completes.
@default true

@param Main Menu Command
@desc The name of the Journal command in main menu and it's visibility.
@default name: Journal, visible: true

@param ================
@param  Journal Command Options
@param ================

@param Commands Type
@desc Choose to use text, icons or both text and icons for the quest commands.
@default text

@param Command Icons
@desc The icons you want to use for each quest command.
@default all: 229, completed: 233, failed: 231, started: 232, cancel: 74

@param Command Names
@desc The icons you want to use for each quest command.
@default started: Active, completed: Complete, failed: Failed, all: 'All', cancel: Back

@param Command Font Size
@desc The font size for each command.
@default 18

@param Command Columns
@desc How many commands to appear per row.
@default 1

@param Command Rows
@desc How many commands to appear per column.
@default 1

@param ================
@param  Quest Scene Options
@param ================

@param Use Categories
@desc Disable or enable categories.
@default true

@param Auto Select Active Quest
@desc Will auto select active quest, by expanding category it's contained in and selecting it.
@default true

@param Category Color
@desc What color should the category title text be?
@default 14

@param More Options Names
@desc When selecting a quest a more options window will open. These are the command names.
@default setActive: Set Active, moreInfo: More Info, cancel: Back

@param Objective Bullet Icon
@desc The icon that appears as a bullet for each objective
@default 87

@param Title Font Size
@desc The quest title font size
@default 32

@param Horizontal Line Color
@desc What color should the horizontal lines be?
@default 14

@param Description Settings
@desc The description title font size and name.
@default titleSize: 24, color: 14, name: Description, descriptionSize: 18

@param Objective Settings
@desc The objectives title font size, description size and name of title
@default titleSize: 24, color: 14, name: Objectives, descriptionSize: 18

@param Reward Settings
@desc The rewards title font size, description size and name of title
@default titleSize: 28, color: 14, name: Rewards, itemSize: 18

@param ================
@param  Quest Track Options
@param ================

@param Use Tracker
@desc Turn the quest tracker on and off.
@default true

@param Window Options
@desc Appearance options of the tracker window on map.
@default x: 0, y:0, width: 200, height: 125, opacity: 255

@param Window Contents
@desc Appearance options of the tracker window's contents.
@default title: true, objective: true, objectiveName: Objective, icon: true

@param Content Sizes
@desc The font size of each content section
@default title: 22, objective: 18, body: 14

@help
================================================================================
▼ TERMS OF USE
================================================================================
Credit goes to: LTN Games
Please don't share anywhere else unless given strict permission
by the author of the plugin: LTN Games.
The plugin may be used in  non-commerical products, for a commercial license
please visit http://ltngames.net.
Credit must be given!

Please report all bugs to http://ltngames.net/
===============================================================================
▼ DEPENDENCIES
===============================================================================
Requires LTN Core.
Requires LTN Quest Editor

===============================================================================
▼ INFORMATION
===============================================================================
This Quest Journal plugin gives you the ability to create, and track your quests.
You will have a new scene in the menu which will show you all the currently
unlocked and active quests.

You may also track a quest by using plugin commands or selecting a quest in the
Journal scene.

===============================================================================
▼ INSTRUCTIONS
===============================================================================
Simply place this file in your project's js/plugins folder
Start the quest editor and select a directory and start creating quests.

Be sure to setup all your quests in the quest editor, and take note of the Id
the quests you're creating has, this will help you use the plugin commands
more effectivly.

============================================================
PLUGIN COMMANDS:
============================================================
QUEST - Is the keyword for this plugin, it is used before
using any of the plugin commands.

--------------
QUEST Start questId

Start - Lets the plugin know you want to start a quest.
QuestId - The id of the quest you would like to start.

----------------
QUEST Advance QuestId Next/Prev

Advance - Let's the plugin know you want to advance the current
quest by 1 step.
QuestId - Same as above, this let's the plugin know the quest you
want to advance.
Next/Prev - You can choose either Next or Prev. Next will advance
the quest 1 step.
Prev will make the quest go back 1 step.

-------------
QUEST Fail QuestId

Fail - Let's the plugin know you want to fail a quest.
QuestId - The Id of the quest you want to fail.

------------
QUEST Complete QuestId

Complete - Let's the plugin know you want to complete the quest.
questId - The id of the quest you want to complete.

Completing a quest will make it inactive and mark the quuest as
complete in the Journal Scene.

-----------
QUEST Track QuestId

This allows you to see the current quests and it's current objective
while on the map, in it's own window.

Track - Let's the plugin know you want to track the quest.
QuestId - The Id of the quest you want to track.

------------
QUEST OpenQuestJournal

This plugin command will open the Quest Journal scene.

============================================================
SCRIPT CALLS:
============================================================
QUEST.isStepComplete(questId, step)
Will return true if the quests step is complete

QUEST.isStepActive(questId, step)
Will return true if the quests step is currently active.

QUEST.isQuestComplete(questId)
This will return true if the quest is complete.

QUEST.isQuestStarted(questId)
This will return true if the quest has started. this will also
return true if the quest is complete as well.

QUEST.getQuests(type)
This is for the more advance user, it will retrieve an object of
all quests in the quest type.

'all' - Will retrieve all quests
'started' - Will retrieve all quest that have started.
'complete' - Will retrieve all quests that have been complete.
'failed' - Will retrieve all quest that have failed.

QUEST.startQuest(questId)
This is another way of starting a quests instead of using the
plugin command.

QUEST.failQuest(questId)
This is another way of failing a quests instead of using the
plugin command.

QUEST.completeQuest(questId)
This is another way of completing a quests instead of using the
plugin command.

 */
'use strict';
(function () {
  if (typeof LTN === 'undefined') {
    const strA = 'You need to install the LTN Core '
    const strB = 'in order for this plugin to work! Please visit'
    const strC = '\n http://ltngames.net/ltn-core/'
    const strD = ' to download the latest verison.'
    throw new Error(strA + strB + strC + strD)
  } else {
    // Set plugin namespace
    const register = LTN.requireUtils(false, 'registerPlugin')
    register('QuestJournal', '1.0.1', 'LTNGames')
  }
})()

/**
 * @property {object} Quest - Script call global, for plugin user.
 */
let QUEST = null;

(function ($) {
  // Require Utility functions
  const $Utils = LTN.requireUtils(true)

  $.Parameters = PluginManager.getPluginParameters('LTN_QuestJournal')
  $.Param = $.Param || {}

  $.Param.questStateColors = $Utils.toObj($.Parameters['Quest State Colors'])
  $.Param.stepStateColors = $Utils.toObj($.Parameters['Objective State Colors'])
  $.Param.rewardIcons = $Utils.toObj($.Parameters['Reward Icons'])
  $.Param.autoComplete = $Utils.toBool($.Parameters['Auto Complete Quests'])
  $.Param.mainMenu = $Utils.toObj($.Parameters['Main Menu Command'])

  $.Param.commandNames = $Utils.toObj($.Parameters['Command Names'])
  $.Param.commandIcons = $Utils.toObj($.Parameters['Command Icons'])
  $.Param.maxCols = Number($.Parameters['Command Columns']) || 4
  $.Param.maxRows = Number($.Parameters['Command Rows']) || 1
  $.Param.commandsType = $.Parameters['Commands Type'] || 'text'
  $.Param.commandFontSize = Number($.Parameters['Command Font Size']) || 28
  $.Param.moreOptions = $Utils.toObj($.Parameters['More Options Names'])

  $.Param.useCategories = $Utils.toBool($.Parameters['Use Categories'] || true)
  $.Param.autoSelect = $Utils.toBool($.Parameters['Auto Select Active Quest'] || true)
  $.Param.categoryColor = Number($.Parameters['Category Color'])
  $.Param.objectiveIcon = Number($.Parameters['Objective Bullet Icon'])
  $.Param.titleSize = Number($.Parameters['Title Font Size']) || 32
  $.Param.descSettings = $Utils.toObj($.Parameters['Description Settings'])
  $.Param.stepSettings = $Utils.toObj($.Parameters['Objective Settings'])
  $.Param.rewardSettings = $Utils.toObj($.Parameters['Reward Settings']) || 29

  $.Param.useTracker = $Utils.toBool($.Parameters['Use Tracker'])
  $.Param.trackerWinOptions = $Utils.toObj($.Parameters['Window Options'])
  $.Param.trackerWinContents = $Utils.toObj($.Parameters['Window Contents'])
  $.Param.trackerSizes = $Utils.toObj($.Parameters['Content Sizes'])
  $.Param.trackerNames = $Utils.toObj($.Parameters['Content Names'])

  /** -----------------------------------------------------------------------
  * Quest Managment Module >>
  *
  *
  ------------------------------------------------------------------------ */
  let _questInstance = null
  /**
   * Quest Managment Module (Singleton) Handles all quest JSON data and the quests game object.
   *
   * @class QuestManager
   */
  class QuestManager {
    constructor () {
      if (!_questInstance) {
        _questInstance = this
      } else {
        return _questInstance
      }

     /**
      * @property {object} QuestsData - Will hold all Quest data retrieved from JSON when script is loaded.
      */
      this._data = this._data || {}

      /**
       * @property {array} Quests - [Game Object] Will contain all quests data and extra properties when new game has started.
       */
      this._quests = this._quests || []

      /**
       * @property {array} Active - The current active quest, used for tracking quest objectives.
       */
      this._active = this._active || []
    }

    /**
     * This function loads the JSON contianing all quests
     *
     *
     * @memberOf QuestManager
     */
    loadAllQuests () {
      if (Utils.isNwjs()) {
        this._data = $Utils.loadJSON('/data/', 'Quests')
      } else if (Utils.canReadGameFiles()) {
        this._data = $Utils.ajaxLoadFileAsync(`${$Utils.projectPath()}/data/quests'`, '.json')
      }
    }

    /**
     * This function sets up quests from the JSON and into a new object with extra properties
     * to determine the quests current state.
     *
     * @memberOf QuestManager
     */
    setupAllQuests () {
      const data = this._data
      const dataMax = data.length
      for (let i = 0; i < dataMax; i++) {
        const dataQuest = data[i]
        const quest = {}

        /**
         * @property {array} id - The quests unique id created from array length
         */
        quest.id = dataQuest.id

        /**
         * @property {array} name - The quests name
         */
        quest.name = dataQuest.name

        /**
         * @property {array} iconid - The quests icon id.
         */
        quest.iconid = dataQuest.iconid

        /**
         * @property {array} description - The quests description.
         */
        quest.description = dataQuest.description

        /**
         * @property {array} category - The quests category.
         */
        quest.category = dataQuest.category

        /**
         * @property {array} steps - The quests steps or objective, an array of strings
         */
        quest.steps = dataQuest.steps

        /**
         * @property {array} rewards - The quests rewards array of objects
         */
        quest.rewards = dataQuest.rewards

        /**
         * @property {boolean} started - Flag to know if quest has failed
         */
        quest.started = false

        /**
         * @property {boolean} Complete - Flag to know if quest has failed
         */
        quest.complete = false

        /**
         * @property {boolean} failed - Flag to know if quest has failed
         */
        quest.failed = false

        /**
         * @property {boolean} failed - Flag to know if quest has failed
         */
        quest.active = false

        /**
         * @property {function} onActive - Callback when the quest has become Active.
         */
        quest.onActive = null

        /**
         * @property {function} onFail - Callback when the quest has failed.
         */
        quest.onFail = null

        /**
         * @property {function} onStart - Callback when the quest has started.
         */
        quest.onStart = dataQuest.onStart || null

        /**
         * @property {function} onComplete - Callback when the quest has completed.
         */
        quest.onComplete = dataQuest.onComplete || null

        quest.step = 0
        /* Push current quest to global Quests array */
        if (this._quests[quest.id]) {
          continue
        }
        this._quests[quest.id] = quest
      }
    }

    /**
     * Retrieves all quests that have started, failed or completed.
     *
     * @param {String} type - The type of quests to retrieve. 'all', 'failed' etc
     * @returns {Array} - result - An array of all quests matching critera
     *
     * @memberOf QuestManager
     */
    getQuests (type) {
      const quests = this._quests
      const result = []
      const max = quests.length
      for (let i = 0; i < max; i++) {
        if (!quests[i]) {
          continue
        }
        if (quests[i].started || quests[i].complete || quests.failed) {
          switch (type) {
            case 'all':
              result.push(quests[i])
              break
            case 'started':
              if (quests[i].started) {
                result.push(quests[i])
              }
              break
            case 'complete':
              if (quests[i].complete) {
                result.push(quests[i])
              }
              break
            case 'failed':
              if (quests[i].failed) {
                result.push(quests[i])
              }
              break
            default:
              break
          }
        }
      }
      return result
    }

    /**
     * Retrieves the categories available by getting each category from Quests array.
     *
     * @returns {Array}
     *
     * @memberOf QuestManager
     */
    getCategories () {
      const list = []
      for (const quest of this._quests) {
        if (typeof quest === 'undefined') {
          continue
        }
        const category = quest.category
        if (list.indexOf(category) === -1 || typeof category === 'undefined') {
          list.push(category)
        }
      }
      return list
    }

    /**
     * Returns the current step of the quest id given in the argument
     *
     * @param {any} questId - The quest id of the quest you want to retrieve it's step
     * @returns {Number}
     *
     * @memberOf QuestManager
     */
    getCurrentStep (questId) {
      return this._quests[questId].step
    }

    /**
     * Returns the state of the quests step completion flag
     *
     * @param {any} questId - The quest id of the quest you want to check
     * @param {any} step - the step id of the step you want to check
     * @returns {Boolean}
     *
     * @memberOf QuestManager
     */
    isStepComplete (questId, step) {
      return this._quests[questId].steps[step - 1].complete
    }

    /**
     * Determines if the quests step given is the current active step.
     *
     * @param {any} questId - The quest id of the quest you want to check
     * @param {any} step - the step id of the step you want to check
     * @returns {Boolean}
     *
     * @memberOf QuestManager
     */
    isStepActive (questId, step) {
      return this.getCurrentStep(questId) === step
    }

    /**
     * Determines if the quest given has started
     *
     * @param {any} questId
     * @returns {Boolean}
     *
     * @memberOf QuestManager
     */
    isQuestStarted (questId) {
      if (this._quests[questId]) {
        return this._quests[questId].started
      }
    }

    /**
     * Determines if the quest given is complete
     *
     * @param {any} questId
     * @returns
     *
     * @memberOf QuestManager
     */
    isQuestComplete (questId) {
      if (this._quests[questId]) {
        return this._quests[questId].complete
      }
    }

    /**
     * Determines if the quest given has failed
     *
     * @param {any} questId
     * @returns
     *
     * @memberOf QuestManager
     */
    isQuestFailed (questId) {
      if (this._quests[questId]) {
        return this._quests[questId].failed
      }
    }

    /**
     * Returns the active quest. Used for quest tracker
     *
     * @returns {Number}
     *
     * @memberOf QuestManager
     */
    activeQuest () {
      return this._active[0]
    }

    /**
     * Sets the quest given as the active quest
     *
     * @param {any} questId - The quest id of the quest you want to set as the active quest.
     *
     * @memberOf QuestManager
     */
    setActiveQuests (questId) {
      const quests = this._quests
      const quest = this._quests[questId]
      if (quest.steps.length === 0) {
        return
      }

      if (typeof this._active[0] !== 'undefined') {
        quests[this._active[0].id].active = false
      }
      // Clear array
      // @TODO - A future update will include more than 1 active quest and this will become obselete.
      this._active.length = 0
      if (quest.step === 0) {
        this.advanceQuest(questId, 'next')
      }

      this._active.push(quest)
      quest.active = true
    }

    /**
     * Starts the quest with the id given in the argument
     *
     * @param {Number} questId - the quest id of the quest you want to start
     *
     * @memberOf QuestManager
     */
    startQuest (questId) {
      if (this.isQuestStarted(questId)) {
        return
      }
      this.runOnStart(questId)
      this._quests[questId].started = true
    }

    isLastStep (questId, currentStep) {
      const quest = this._quests[questId]
      const maxSteps = quest.steps.length
      return maxSteps === currentStep
    }

    /* @TODO - Rewrite, advanceQuest function. Use stepId instead of index, allow for failed steps */
    /**
     * Advances a step or goes back a step
     *
     * @param {Number} questId - The quest's id you want to advance
     * @param {any} step - Number or String, 'next', 'prev', or step number
     *
     * @memberOf QuestManager
     */
    advanceQuest (questId, step) {
      const quest = this._quests[questId]
      const currentStep = this.getCurrentStep(questId)
      const maxSteps = quest.steps.length
      const previousStep = quest.steps[currentStep - 1]
      if ($Utils.isDefined(previousStep)) {
        previousStep.complete = true
      }
      /* If last step, & auto complete on then complete quest */
      if (currentStep === maxSteps && $.Param.autoComplete) {
        quest.steps[maxSteps - 1].complete = true
        this.completeQuest(questId)
        return
        /* If auto complete off and last step, ensure complete flag is set to true */
      } else if (quest.complete || currentStep === maxSteps) {
        quest.steps[maxSteps - 1].complete = true
        return
      }
      if (!isNaN(step)) {
        quest.step = Number(step)
        quest.steps[this.getCurrentStep(questId) - 1].hidden = false
      } else if (typeof step === 'string') {
        switch (step.toLowerCase()) {
          case 'next':
            quest.step = currentStep + 1
            quest.steps[this.getCurrentStep(questId) - 1].hidden = false
            break
          case 'prev':
            quest.step = currentStep - 1
            break
          default:
            throw new Error(`Unable to advance the quest, are you sure the step argument '${step}' is correct?`)
        }
      }
    }

    completeQuest (questId) {
      if (this.isQuestComplete(questId)) {
        return
      }
      this._quests[questId].complete = true
      this._quests[questId].active = false
      this.applyRewards(questId)
      this.runOnComplete(questId)
    }

    failQuest (questId) {
      if (this.isQuestFailed(questId)) {
        return
      }
      this.runOnFail(questId)
      this._quests[questId].failed = true
    }

    runOnComplete (questId) {
      const onComplete = this._quests[questId].onComplete
      if ($Utils.isFunction(onComplete)) {
        onComplete()
      } else if (!isNaN(onComplete)) {
        $gameTemp.reserveCommonEvent(onComplete)
        $gameMap.requestRefresh()
      }
    }

    runOnStart (questId) {
      const onStart = this._quests[questId].onStart
      if ($Utils.isFunction(onStart)) {
        onStart()
      } else if (!isNaN(onStart)) {
        $gameTemp.reserveCommonEvent(onStart)
        $gameMap.requestRefresh()
      }
    }

    runOnFail (questId) {
      const onFail = this._quests[questId].onFail
      if ($Utils.isFunction(onFail)) {
        onFail()
      } else if (!isNaN(onFail)) {
        $gameTemp.reserveCommonEvent(onFail)
        $gameMap.requestRefresh()
      }
    }

    applyRewards (questId) {
      const rewards = this._quests[questId].rewards
      let item = null
      const max = rewards.length
      for (let i = 0; i < max; i++) {
        const reward = rewards[i]
        const amount = Number(reward.amount)
        reward.hidden = false
        switch (reward.type) {
          case 'item':
            item = $dataItems[reward.id]
            $gameParty.gainItem(item, amount)
            break

          case 'armor':
            item = $dataArmors[reward.id]
            $gameParty.gainItem(item, amount)
            break

          case 'weapon':
            item = $dataWeapons[reward.id]
            $gameParty.gainItem(item, amount)
            break
          case 'gold':
            $gameParty.gainGold(amount)
            break

          case 'exp':
            if (!reward.leaderOnly) {
              for (const actor in $gameParty.allMembers()) {
                if ($gameParty.allMembers().hasOwnProperty(actor)) {
                  if (!$gameActors.actor(actor)) {
                    continue
                  }
                  $gameActors.actor(actor).gainExp(amount)
                }
              }
            } else {
              $gameParty.leader().gainExp(amount)
            }
            break
          default:
            break
        }
      }
    }

    startAllQuests () {
      const max = this._quests.length
      for (let i = 1; i < max; i++) {
        const quest = this._quests[i]
        const steps = quest.steps
        quest.started = true
        for (let j = 0; j < steps.length; j++) {
          const step = steps[j]
          step.hidden = false
        }
      }
    }
  }

  /** -----------------------------------------------------------------------
  * Quest Tracker Window >>
  *
  *
  ------------------------------------------------------------------------ */

  /**
   * A window for displaying the current active quests objectives or steps
   *
   * @class Window_QuestTrack
   * @extends {Window_Base}
   */
  class Window_QuestTrack extends Window_Base {
    constructor (x, y) {
      super()
      this.initialize(x, y)
    }

    initialize (x, y) {
      const options = $.Param.trackerWinOptions
      const width = options.width || 350
      const height = options.height || 125
      super.initialize(x, y, width, height)
      this._quests = QUEST._quests
      this.activeQuest = QUEST.activeQuest() || null
      if (!this.activeQuest) {
        this.visible = false
      }
      this.opacity = options.opacity
      this.refresh()
    }

    update () {
      super.update()
      if (this.activeQuest <= 0) {
        return
      }
      if (this.activeQuest.complete) {
        this.visible = false
      }
    }

    /* @TODO - Find way to refresh window contents after changing size */
    updateWindowSize (width, height) {
      this.width = width
      this.height = height
      this._refreshAllParts()
    }

    /* The Active quest which will show up in the window */
    setActiveQuest (quest) {
      const options = $.Param.trackerWinOptions
      QUEST.setActiveQuests(quest.id)
      this.activeQuest = QUEST.activeQuest()
      this.visible = true
      this.opacity = options.opacity || 255
      this.refresh()
    }

    refresh () {
      if (this.activeQuest <= 0) {
        return
      }
      this.contents.clear()
      this.drawTitle()
      this.drawSteps()
    }

    drawTitle () {
      const fontSizes = $.Param.trackerSizes
      const contentOptions = $.Param.trackerWinContents
      const text = this.activeQuest.name
      const icon = this.activeQuest.iconid

      if (contentOptions.title === true) {
        this.drawIcon(icon, 0, 0)
        this.contents.fontSize = fontSizes.title
        this.drawText(text, 0 + Window_Base._iconWidth, 0, this.width, 'left')
      }
    }

    drawSteps () {
      const fontSizes = $.Param.trackerSizes
      const contentOptions = $.Param.trackerWinContents
      const quest = this.activeQuest
      const stepIcon = $.Param.objectiveIcon
      const currentStep = QUEST.getCurrentStep(this.activeQuest.id)
      const step = this.activeQuest.steps[currentStep - 1]
      const variable = $gameVariables.value(step.variable)
      const amountToCollect = step.amountToCollect
      const collectText = ` ${variable} / ${amountToCollect}`
      const fullText = step.variable && (variable <= amountToCollect) ? step.desc + collectText : step.desc
      const text = fullText.split(' ')
      let x = 0
      let y = contentOptions.title === true ? this.lineHeight() - 6 : 0
      /**
       * Draw Step/Objective title
       */
      this.changeTextColor(this.systemColor())
      this.contents.fontSize = fontSizes.objective
      if (contentOptions.objective) {
        this.drawText(contentOptions.objectiveName, 0, y, this.width, 'left')
      }

      this.resetFontSettings()
      this.contents.fontSize = fontSizes.body
      if (!step.hidden && QUEST.isStepActive(quest.id, step.id)) {
        x = Window_Base._iconWidth
        y += this.lineHeight()
        if (contentOptions.icon) {
          this.drawIcon(stepIcon, 0, y)
        }
        /* Auto Wrap Text */
        for (let j = 0; j < text.length; j++) {
          const word = text[j]
          const width = this.textWidth(`${word} `)
          if (x + width >= this.contents.width) {
            x = Window_Base._iconWidth
            y += this.lineHeight() - 20
          }
          this.drawText(`${word} `, x, y)
          x += width
        }
      }
    }
  }

  /** -----------------------------------------------------------------------
  * Quest Commands Window >>
  *
  *
  ------------------------------------------------------------------------ */

  /**
   *  Window for displaying all the quest commands (failed, compelte, all)
   *
   * @class Window_QuestCommands
   * @extends {Window_Command}
   */
  class Window_QuestCommands extends Window_HorzCommand {
    constructor (x, y) {
      super()
      this.initialize(x, y)
    }

    initialize (x, y) {
      const width = this.windowWidth()
      const height = this.windowHeight()
      super.initialize(x, y, width, height)
    }

    update () {
      super.update()
    }

    addItemCommands () {
      const commandNames = $.Param.commandNames
      const icons = $.Param.commandIcons

      for (const command in commandNames) {
        if (commandNames.hasOwnProperty(command)) {
          const name = commandNames[command]
          const symbol = command
          const icon = icons[command]
          /* If command name contains a string with letters then add the command */
          if (/^[a-zA-Z]+$/.test(name)) {
            this.addCommand(icon, name, symbol, true)
          }
        }
      }
    }

    drawCommand (icon, text, rect) {
      const type = $.Param.commandsType
      switch (type) {
        case 'icons':
          this.drawIcon(icon, rect.x, rect.y / 2)
          break
        case 'both':
          this.drawIcon(icon, rect.x, rect.y)
          this.contents.fontSize = 18
          this.drawText(text, rect.x + Window_Base._iconWidth, rect.y)
          break
        default:
          this.drawText(text, rect.x, rect.y / 2, 'center')
          break
      }
    }

    drawItem (index) {
      const rect = this.itemRectForText(index)
      this.resetTextColor()
      this.changePaintOpacity(this.isCommandEnabled(index))
      this.drawCommand(this.commandIcon(index), this.commandName(index), rect)
    }

    addCommand (icon, name, symbol, enabled, ext) {
      if (typeof enabled === 'undefined') {
        enabled = true
      }
      if (typeof ext === 'undefined') {
        ext = null
      }

      if (typeof icon === 'undefined') {
        icon = 0
      }
      this._list.push({ icon: icon, name: name, symbol: symbol, enabled: enabled, ext: ext })
    }

    setCategory (symbol) {
      if (this._categorySymbol === symbol) {
        return
      }
      this._categorySymbol = symbol
      this.refresh()
    }

    commandIcon (index) {
      return this._list[index].icon
    }

    windowWidth () {
      return Graphics.width / 3
    }

    windowHeight () {
      return this.fittingHeight(this.numVisibleRows())
    }

    numVisibleRows () {
      return $.Param.maxRows
    }

    maxCols () {
      return $.Param.maxCols
    }

    makeCommandList () {
      this.addItemCommands()
    }
  }
  /** -----------------------------------------------------------------------
  * Quest Log Window >>
  *
  *
  ------------------------------------------------------------------------ */
  /**
   * @class
   * @desc A window for displaying all quests and detailed information.
   */

  class Window_QuestLog extends Window_Selectable {
    constructor (cmd, infoWin, x, y) {
      super()
      this.initialize(cmd, infoWin, x, y)
    }

    initialize (cmd, infoWin, x, y) {
      const width = this.windowWidth()
      const height = this.windowHeight()
      super.initialize(x, y, width, height)
      this._commandWindow = cmd
      this._infoWindow = infoWin
      this._refreshCategories = true
      this._data = []
      this._categories = QUEST.getCategories()
      this._quests = QUEST
      this._category = 'none'
    }

    update () {
      super.update()
      if (this._commandWindow) {
        this.setCategory(this._commandWindow.currentSymbol())
      }
    }

    refresh () {
      this.contents.clear()
      if (this._refreshCategories) {
        this.makeItemList()
      }
      this.createContents()
      this.drawAllItems()
    }

    drawItem (index) {
      const item = this._data[index]
      const rect = this.itemRect(index)
      rect.width -= this.textPadding()

      if ($Utils.isDefined(item.expanded)) {
        this.drawCategory(item, rect.x, rect.y, rect.width)
      } else {
        this.drawQuest(item, rect.x, rect.y, rect.width)
      }
    }

    drawCategory (item, x, y, width) {
      const color = $.Param.categoryColor
      const category = item.name
      const text = `${category} (${item.amount})`
      this.changeTextColor(this.textColor(color))
      this.drawText(text, x, y, width)
    }

    drawQuest (quest, x, y, width) {
      const colors = $.Param.questStateColors
      if (!quest) {
        return
      }
      const text = quest.name
      const icon = quest.iconid

      this.resetTextColor()
      this.drawIcon(icon, x, y)

      if (quest.started) {
        this.changeTextColor(this.textColor(colors.started))
      }

      if (quest.complete) {
        this.changeTextColor(this.textColor(colors.complete))
      }

      if (quest.failed) {
        this.changeTextColor(this.textColor(colors.failed))
      }

      if (quest.active) {
        this.changeTextColor(this.textColor(colors.active))
      }

      this.contents.fontSize = $.Param.commandFontSize
      this.drawText(text, x + Window_Base._iconWidth + 2, y, width)
      this.contents.fontItalic = false
    }

    makeItemList () {
      const useCategories = $.Param.useCategories

      if (this._commandWindow.currentSymbol() === 'all') {
        this._data = useCategories ? this.buildByCategory('all') : this._quests.getQuests('all')
      }

      if (this._commandWindow.currentSymbol() === 'completed') {
        this._data = useCategories ? this.buildByCategory('completed') : this._quests.getQuests('completed')
      }

      if (this._commandWindow.currentSymbol() === 'started') {
        this._data = useCategories ? this.buildByCategory('started') : this._quests.getQuests('started')
      }

      if (this._commandWindow.currentSymbol() === 'failed') {
        this._data = useCategories ? this.buildByCategory('failed') : this._quests.getQuests('failed')
      }
    }

    buildByCategory (questType) {
      const list = []
      const questList = this._quests.getQuests(questType)
      const allCategories = this._categories
      // Build Categories
      for (let i = 0; i < allCategories.length; i++) {
        const category = allCategories[i]
        if (typeof category === 'undefined') {
          continue
        }
        const item = {
          name: category,
          expanded: false,
          amount: 0,
          quests: []
        }

        list.push(item)
      }
      // Build Quests
      for (let i = 0; i < questList.length; i++) {
        const quest = questList[i]
        for (const category of list) {
          if (category.name === quest.category) {
            category.amount++
            category.quests.push(quest)
          }
        }
      }
      return list
    }

    expandCategory (name) {
      for (let i = 0; i < this._data.length; i++) {
        const category = this._data[i]
        const quests = category.quests

        if (category.name === name && !category.expanded) {
          let index = i
          category.expanded = true

          for (let j = 0; j < quests.length; j++) {
            index++
            this._data.splice(index, 0, quests[j])
          }
        }
      }
      this.refresh()
      this.activate()
    }

    collapseCategory (name) {
      for (let i = 0; i < this._data.length; i++) {
        const category = this._data[i]
        const quests = category.quests

        if (!category.hasOwnProperty('expanded')) {
          continue
        }

        if (category.name === name && category.expanded) {
          const index = i + 1
          category.expanded = false
          this._data.splice(index, quests.length)
        }
      }
      this.refresh()
      this.activate()
    }

    item () {
      return this._data && this.index() >= 0 ? this._data[this.index()] : null
    }

    maxItems () {
      return this._data ? this._data.length : 1
    }

    callUpdateHelp () {
      if (this.active && this._infoWindow) {
        this._infoWindow.setItem(this.item())
      }
    }

    setCategory (symbol) {
      if (this._categorySymbol === symbol) {
        return
      }
      this._categorySymbol = symbol
      this.refresh()
    }

    isEnabled () {
      return this.item().started || $Utils.isDefined(this.item().expanded)
    }

    isCurrentItemEnabled () {
      return this.isEnabled(this.item())
    }

    selectLast () {
      const index = this.index()
      this.select(index >= 0 ? index : 0)
    }

    selectActiveQuest () {
      const quest = QUEST.activeQuest()
      const items = this._logWindow._data
      for (let i = 0; i < items.length; ++i) {
        const item = items[i]
        if ($Utils.isDefined(item.id)) {
          if (item.id === quest.id) {
            this._logWindow.select(i)
          }
        }
      }
    }

    updateInfo () {
      this.setHelpWindowItem(this.item())
    }

    maxCols () {
      return 1
    }

    spacing () {
      return 48
    }

    windowWidth () {
      return Graphics.width / 3
    }

    updateWindowHeight () {
      this.height = this.windowHeight() - this._commandWindow.height
    }

    windowHeight () {
      return Graphics.height
    }
  }
  /** -----------------------------------------------------------------------
  * Quest Info Window >>
  *
  *
  ------------------------------------------------------------------------ */
  /**
   * @class
   * @desc A window for displaying all quests detailed information.
   */

  class Window_QuestInfo extends Window_Command {
    constructor (x, y) {
      super()
      this.initialize(x, y)
    }

    initialize (x, y) {
      const width = this.windowWidth()
      const height = this.windowHeight()
      super.initialize(x, y, width, height)
      this._quest = null
      this._scrollY = 0
      this.deactivate()
    }

    update () {
      super.update()
      this.cursorUp()
      this.cursorDown()
      this.processWheel()
    }

    refresh () {
      this.contents.clear()
      if (!this._quest || $Utils.isDefined(this._quest.expanded)) {
        return
      }
      this.drawTitle()
      this.drawDescription()
      this._needsRefresh = false
    }

    drawTitle () {
      const x = 0
      const y = 0 + this._scrollY
      const text = this._quest.name
      this.contents.fontSize = $.Param.titleSize
      this.changeTextColor(this.systemColor())
      this.drawIcon(this._quest.iconid, x, y)
      this.drawText(text, x + Window_Base._iconWidth, y, this.width, 'left')
    }

    drawLocation () { }

    drawQuestGiverFace () { }

    drawDescription () {
      let x = 0
      let y = (this.lineHeight() * 2) + this._scrollY
      const descSettings = $.Param.descSettings
      const text = this._quest.description.split(' ')
      const max = text.length

      this.changeTextColor(this.textColor(descSettings.color))
      this.contents.fontSize = descSettings.titleSize
      this.drawTextWithLine(this.systemColor(), descSettings.name, 0, y + this._scrollY, this.width,
        'left')

      y += this.lineHeight()
      /* Auto Wrap Text */
      this.resetFontSettings()
      this.contents.fontSize = descSettings.descriptionSize

      for (let i = 0; i < max; i++) {
        const word = text[i]
        const width = this.textWidth(`${word} `)
        if (x + width >= this.contents.width) {
          x = 0
          y += this.lineHeight()
        }
        this.drawText(`${word} `, x, y)
        x += width
      }
      this.drawSteps(y)
    }

    drawSteps (y) {
      const stepSettings = $.Param.stepSettings
      const colors = $.Param.stepStateColors
      let x = 0
      const max = this._quest.steps.length
      this.changeTextColor(this.textColor(stepSettings.color))
      this.contents.fontSize = stepSettings.titleSize
      this.drawTextWithLine(this.systemColor(), stepSettings.name, 0, y += this.lineHeight(), this.width, 'left')

      /* Loop through all steps(objective) */
      for (let i = 0; i < max; i++) {
        const step = this._quest.steps[i]
        const variable = $gameVariables.value(step.variable)
        const amountToCollect = step.amountToCollect
        const collectText = ` ${variable} / ${amountToCollect}`
        const fullText = step.variable && variable <= amountToCollect ? step.desc + collectText : step.desc
        const text = fullText.split(' ')
        this.resetFontSettings()
        this.contents.fontSize = stepSettings.descriptionSize
        if (step.hidden) {
          continue
        }

        if (step.complete) {
          this.changeTextColor(this.textColor(colors.complete))
        }

        /* If step is active step then set active color -
           @TODO Change later when steps have more properties and I can use step.isActive */
        if (i + 1 === this._quest.step && QUEST.activeQuest() === this._quest && !this._quest.complete) {
          this.changeTextColor(this.textColor(colors.active))
        }

        x = Window_Base._iconWidth
        y += this.lineHeight()
        this.drawIcon(87, 0, y)

        /* Auto Wrap Text */
        for (let j = 0; j < text.length; j++) {
          const word = text[j]
          const width = this.textWidth(`${word} `)
          if (x + width >= this.contents.width) {
            x = 0
            y += this.lineHeight()
          }
          this.drawText(`${word} `, x, y)
          x += width
        }
      }
      this.drawRewards(y)
    }

    drawRewards (y) {
      const rewardSettings = $.Param.rewardSettings
      const icons = $.Param.rewardIcons
      const rewards = this._quest.rewards
      const maxRewards = rewards.length
      const x = 0
      let item = null
      let text = null

      /* Rewards Title */
      this.changeTextColor(this.textColor(rewardSettings.color))
      this.contents.fontSize = rewardSettings.titleSize
      this.drawTextWithLine(this.systemColor(), rewardSettings.name, 0, y += this.lineHeight(), this.width, 'left')

      /* Draw Each Reward */
      this.resetFontSettings()
      this.contents.fontSize = rewardSettings.itemSize

      for (let i = 0; i < maxRewards; i++) {
        const reward = rewards[i]

        if (reward.hidden) {
          continue
        }

        y += this.lineHeight()

        switch (reward.type) {
          case 'item':
            item = $dataItems[reward.id]
            text = item.name + ' x ' + reward.amount
            this.drawIcon(item.iconIndex, x, y)
            this.drawText(text, x + Window_Base._iconWidth, y, this.width, 'left')
            break

          case 'weapon':
            item = $dataWeapons[reward.id]
            text = item.name + ' x ' + reward.amount
            this.drawIcon(item.iconIndex, x, y)
            this.drawText(text, x + Window_Base._iconWidth, y, this.width, 'left')
            break

          case 'armor':
            item = $dataArmors[reward.id]
            text = item.name + ' x ' + reward.amount
            this.drawIcon(item.iconIndex, x, y)
            this.drawText(text, x + Window_Base._iconWidth, y, this.width, 'left')
            break

          case 'gold':
            text = reward.amount + ' ' + TextManager.currencyUnit
            this.drawIcon(icons.gold, x, y)
            this.drawText(text, x + Window_Base._iconWidth, y, this.width, 'left')
            break

          case 'exp':
            text = reward.amount + ' ' + TextManager.expA
            this.drawIcon(icons.exp, x, y)
            this.drawText(text, x + Window_Base._iconWidth, y, this.width, 'left')
            break

          default:
            break
        }
      }
    }

    cursorUp () {
      if (this.isScrollUp()) {
        if (this._scrollY === 0) {
          return
        }
        SoundManager.playCursor()
        this._scrollY += Number(this.lineHeight()) * 1
        this.refresh()
      }
    }

    cursorDown () {
      if (this.isScrollDown()) {
        this._scrollY -= Number(this.lineHeight()) * 1
        SoundManager.playCursor()
        this.refresh()
      }
    }

    processWheel () {
      if (this.isOpenAndActive()) {
        const threshold = 20

        if (TouchInput.wheelY >= threshold) {
          SoundManager.playCursor()
          this._scrollY -= Number(this.lineHeight()) * 1
          this.refresh()
        }

        if (TouchInput.wheelY <= -threshold) {
          if (this._scrollY === 0) {
            return
          }
          SoundManager.playCursor()
          this._scrollY += Number(this.lineHeight()) * 1
          this.refresh()
        }
      }
    }

    isScrollDown () {
      return (Input.isRepeated('pagedown') || Input.isRepeated('down')) && this.isScrollReady()
    }

    isScrollUp () {
      return (Input.isRepeated('pageup') || Input.isRepeated('up')) && this.isScrollReady()
    }

    isScrollReady () {
      return this.isOpen() && this.active
    }

    updateCursor () {
      if (this.isScrollReady()) {
        this.setCursorRect(0, 0, this.contents.width, this.contents.height)
      } else {
        this.setCursorRect(0, 0, 0, 0)
      }
    }

    deactivate () {
      this.select(-1)
      this.active = false
      this.contents.clearRect(0, 0, this.contents.width, this.contents.height)
      this._scrollY = 0
    }

    setItem (item) {
      this._quest = item
      this.refresh()
    }

    windowWidth () {
      return Graphics.width - (Graphics.width / 3)
    }

    windowHeight () {
      return Graphics.height
    }

  }

  /** -----------------------------------------------------------------------
  * Window_QuestOptions >>
  *
  *
  ------------------------------------------------------------------------ */
  /**
   * @class
   * @desc A window for displaying a confirmation to set quest active or not.
   */
  class Window_QuestOptions extends Window_Command {
    constructor (cmdWindow, x, y) {
      super()
      this.initialize(cmdWindow, x, y)
    }

    initialize (cmdWindow, x, y) {
      const width = this.windowWidth()
      const height = this.windowHeight()
      super.initialize(x, y, width, height)
      this._commandWindow = cmdWindow
      this.visible = false
      this._category = 'setActive'
      this.refresh()
    }

    update () {
      super.update()
    }

    refresh () {
      super.refresh()
    }

    makeCommandList () {
      this.addItemCommands()
    }

    addItemCommands () {
      const names = $.Param.moreOptions
      this.addCommand(names.setActive, 'setActive', true)
      this.addCommand(names.moreInfo, 'moreInfo', true)
      this.addCommand(names.cancel, 'cancel', true)
    }

    windowWidth () {
      return Graphics.width / 3
    }

    updateWindowHeight () {
      this.height = this.windowHeight() - this._commandWindow.height
    }

    windowHeight () {
      return Graphics.height
    }
  }

   /** -----------------------------------------------------------------------
  * Quest Jounral Scene >>
  *
  *
  ------------------------------------------------------------------------ */

  /**
   * The scene for displaying all quest related windows.
   *
   * @class Scene_QuestJournal
   * @extends {Scene_MenuBase}
   */
  class Scene_QuestJournal extends Scene_MenuBase {
    constructor () {
      super()
      this.initialize()
    }

    initialize () {
      super.initialize()
      this._activeQuest = QUEST.activeQuest() || null
    }

    start () {
      super.start()
    }

    create () {
      super.create()
      this.createBackground()
      this.createWindowLayer()
      this.createWindows()
    }

    terminate () {
      super.terminate()
    }

    update () {
      super.update()
    }

    createBackground () {
      this._background = new Sprite()
      this._background.bitmap = SceneManager.backgroundBitmap()
      this.addChild(this._background)
    }

    createWindows () {
      this.createCommandWindow()
      this.createInfoWindow()
      this.createLogWindow()
      this.createOptionsWindow()
      this.autoSelectActiveQuest()
    }

    createCommandWindow () {
      this._commandWindow = new Window_QuestCommands(0, 0)
      this._commandWindow.setHandler('cancel', this.popScene.bind(this))
      this._commandWindow.setHandler('ok', this.onCategoryOk.bind(this))
      this.addChild(this._commandWindow)
    }

    createInfoWindow () {
      const x = this._commandWindow.width
      this._infoWindow = new Window_QuestInfo(x, 0)
      this._infoWindow.setHandler('cancel', this.onInfoCancel.bind(this))
      this._infoWindow.deactivate()
      this.addChild(this._infoWindow)
    }

    createLogWindow () {
      const y = this._commandWindow.height
      const cmd = this._commandWindow
      const infoWindow = this._infoWindow
      this._logWindow = new Window_QuestLog(cmd, infoWindow, 0, y)
      this._logWindow.setHandler('cancel', this.onItemCancel.bind(this))
      this._logWindow.setHandler('ok', this.onItemOk.bind(this))
      this._logWindow.updateWindowHeight()
      this.addChild(this._logWindow)
    }

    createOptionsWindow () {
      const x = this._logWindow.x
      const y = this._logWindow.y
      const commandWindow = this._commandWindow
      this._questOptions = new Window_QuestOptions(commandWindow, x, y)
      this._questOptions.setHandler('cancel', this.onOptionsCancel.bind(this))
      this._questOptions.setHandler('setActive', this.onSetActive.bind(this))
      this._questOptions.setHandler('moreInfo', this.onMoreInfo.bind(this))
      this._questOptions.updateWindowHeight()
      this._questOptions.deactivate()
      this.addChild(this._questOptions)
    }

    onCategoryOk () {
      this._logWindow._refreshCategories = false
      this._logWindow.refresh()
      this._logWindow.activate()
      this._logWindow.selectLast()
    }

    onItemCancel () {
      this._logWindow.deselect()
      this._logWindow._refreshCategories = true
      this._logWindow.refresh()
      this._commandWindow.activate()
    }

    onItemOk () {
      const item = this._logWindow.item()
      if ($Utils.isDefined(item.expanded)) {
        if (!item.expanded) {
          this._logWindow.expandCategory(item.name)
        } else {
          this._logWindow.collapseCategory(item.name)
        }
      } else if ($.Param.useTracker) {
        this._logWindow.visible = false
        this._questOptions.visible = true
        this._questOptions.activate()
        this._questOptions.select(0)
      } else {
        this._logWindow.deselect()
        this._infoWindow.activate()
      }
    }

    onSetActive () {
      const quest = this._logWindow.item()
      if (quest.complete || quest.failed || quest.active) {
        SoundManager.playBuzzer()
        this._questOptions.activate()
      } else {
        this._questOptions.deselect()
        this._questOptions.visible = false
        SoundManager.playOk()
        $._questTracker.setActiveQuest(quest)
        this._logWindow.visible = true
        this._logWindow.activate()
        this._logWindow.selectLast()
        this._logWindow.refresh()
      }
    }

    onOptionsCancel () {
      this._questOptions.deselect()
      this._questOptions.visible = false
      this._logWindow.visible = true
      this._logWindow.activate()
      this._logWindow.selectLast()
    }

    onMoreInfo () {
      this._questOptions.deselect()
      this._questOptions.visible = false
      this._logWindow.visible = true
      this._infoWindow.activate()
    }

    onInfoCancel () {
      this._infoWindow.deactivate()
      this._logWindow.visible = true
      this._logWindow.activate()
      this._logWindow.selectLast()
    }

    /**
     @TODO - Get index for category and active quest in initialize, then select and perform actions in create.
     * For better performance when opening scene.
     */
    autoSelectActiveQuest () {
      if ($.Param.autoSelect && this._activeQuest !== null) {
        const category = QUEST.activeQuest().category
        this._commandWindow.selectSymbol('started')
        this._logWindow.setCategory('started')
        this._logWindow._refreshCategories = false
        this._commandWindow.deactivate()
        this._logWindow.refresh()
        this._logWindow.activate()
        this._logWindow.expandCategory(category)
        this.selectActiveQuest()
        this._logWindow.refresh()
      } else if ($.Param.autoSelect) {
        this._logWindow.expandCategory(this._lastActiveCategory)
      }
    }

    selectActiveQuest () {
      const quest = QUEST.activeQuest()
      const items = this._logWindow._data
      for (let i = 0; i < items.length; ++i) {
        const item = items[i]
        if ($Utils.isDefined(item.id)) {
          if (item.id === quest.id) {
            this._logWindow.select(i)
          }
        }
      }
    }

    /* End Of QuestManager Class */
  }

  $.Alias.gameVariablesOnChange = Game_Variables.prototype.onChange
  Game_Variables.prototype.onChange = function () {
    $.Alias.gameVariablesOnChange.call(this)
    $._questTracker.refresh()
  }
  /** -----------------------------------------------------------------------
  * Setup newgame and add quest tracker window to map. >>
  *- Added in save contents method from LTN Core in newGame to avoid global overwrite
  *
  ------------------------------------------------------------------------ */
  $.Alias.createGameObjects = DataManager.createGameObjects
  DataManager.createGameObjects = function () {
    $.Alias.createGameObjects.call(this)
    QUEST = new QuestManager()
    const saveContents = [QUEST._quests, QUEST._active]
    DataManager.addToSaveContents('QuestJournal', saveContents)
  }

  $.Alias.setupNewGame = DataManager.setupNewGame
  DataManager.setupNewGame = function () {
    $.Alias.setupNewGame.call(this)
    QUEST.loadAllQuests()
    QUEST.setupAllQuests()
  }

  $.Alias.createAllWindows = Scene_Map.prototype.createAllWindows
  if ($.Param.useTracker) {
    Scene_Map.prototype.createAllWindows = function () {
      $.Alias.createAllWindows.call(this)
      const contentOptions = $.Param.trackerWinOptions
      this._questTracker = new Window_QuestTrack()
      this._questTracker.x = contentOptions.x
      this._questTracker.y = contentOptions.y
      $._questTracker = this._questTracker
      this.addChild(this._questTracker)
    }
  }

  /** -----------------------------------------------------------------------
  * Add To Main Menu >>
  *
  *
  ------------------------------------------------------------------------ */
  if ($.Param.mainMenu.visible) {
    //  Setup the Menu scene to contain the Quest Journal command.
    $.Alias.Window_Command_addOrigCmds = Window_MenuCommand.prototype.addOriginalCommands
    Window_MenuCommand.prototype.addOriginalCommands = function () {
      $.Alias.Window_Command_addOrigCmds.call(this)
      this.addCommand($.Param.mainMenu.name, 'quest', $.Param.mainMenu.visible)
    }

    $.Alias.SceneMenu_createCmdWin = Scene_Menu.prototype.createCommandWindow
    Scene_Menu.prototype.createCommandWindow = function () {
      $.Alias.SceneMenu_createCmdWin.call(this)
      this._commandWindow.setHandler('quest', this.commandQuest.bind(this))
    }

    Scene_Menu.prototype.commandQuest = function () {
      SceneManager.push($.scene_QJ)
    }
  }

  /** -----------------------------------------------------------------------
  * Window_Base Additions >>
  *
  * Borrowed from LTN_WindowCore(Unreleased)
  ------------------------------------------------------------------------ */
  Window_Base.prototype.drawTextWithLine = function (color, text, x, y, maxWidth, align) {
    const tw = this.textWidth(text)
    this.drawRect(x + tw, y + this.standardFontSize() / 2 + 4, maxWidth - tw, 3, color)
    this.drawText(text, x, y, maxWidth, align)
  }

  Window_Base.prototype.drawRect = function (x, y, width, height, color) {
    color = color || this.gaugeBackColor()
    this.changePaintOpacity(false)
    this.contents.fillRect(x, y, width, height, color)
    this.changePaintOpacity(true)
  }

  Window_Base.prototype.drawTextAutoWrap = function (text, x, y, maxWidth, align) {

  }

  Window_Base.prototype.drawDarkRect = function (x, y, width, height) {
    const color = this.gaugeBackColor()
    this.changePaintOpacity(false)
    this.contents.fillRect(x, y, width, height, color)
    this.changePaintOpacity(true)
  }

  /** ----------------------------------------------------
   * Plugin Commands >>
   *
   * Contain time control plugin commands.
   *
   ------------------------------------------------------- */
  $.TC_GameInterp_pluginCommand = Game_Interpreter.prototype.pluginCommand
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    if (command === 'QUEST') {
      let quest = null
      switch (String(args[0]).toLowerCase()) {
        case 'openquestjournal':
          SceneManager.push($.scene_QJ)
          break

        case 'track':
          quest = QUEST._quests[args[1]]
          $._questTracker.setActiveQuest(quest)
          $._questTracker.refresh()
          break

        case 'start':
          QUEST.startQuest(args[1])
          $._questTracker.refresh()
          break

        case 'advance':
          QUEST.advanceQuest(args[1], args[2])
          $._questTracker.refresh()
          break

        case 'complete':
          QUEST.completeQuest(args[1])
          $._questTracker.refresh()
          break

        case 'fail':
          QUEST.failQuest(args[1])
          $._questTracker.refresh()
          break

        default:
          throw new Error(`Can't detrmine the QUEST command: ${args[0]}, are you sure this is a proper command ?`)
      }
    } else {
      $.TC_GameInterp_pluginCommand.call(this, command, args)
    }
  }

  /** -----------------------------------------------------------------------
   * Export For Add-Ons >>
   ------------------------------------------------------------------------ */
  $.scene_QJ = Scene_QuestJournal
  $.questTrackerWindow = Window_QuestTrack
})(LTN.requirePlugins(false, 'QuestJournal'))
