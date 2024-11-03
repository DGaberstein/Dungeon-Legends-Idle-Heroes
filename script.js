let gold = 0;
let heroLevel = 1;
let goldPerSecond = 1;
let levelUpCost = 10;
let skillActive = false;
let questActive = false;

// Function to collect gold with animation
function collectGold() {
  gold += skillActive ? goldPerSecond * 2 : goldPerSecond;
  showGoldAnimation();
  updateUI();
}

// Display floating gold animation
function showGoldAnimation() {
  const floatingGold = document.getElementById('floating-gold');
  floatingGold.classList.add('active');
  floatingGold.textContent = '+ ' + (skillActive ? goldPerSecond * 2 : goldPerSecond) + ' Gold';
  
  setTimeout(() => {
    floatingGold.classList.remove('active');
  }, 500); // Reset after animation ends
}

// Function to level up the hero
function levelUp() {
  if (gold >= levelUpCost) {
    gold -= levelUpCost;
    heroLevel++;
    goldPerSecond = Math.floor(heroLevel * 1.5); // Increase GPS as hero levels up
    levelUpCost = Math.floor(levelUpCost * 1.5); // Level up cost increases
    updateUI();
  } else {
    alert("Not enough gold!");
  }
}

// Function to activate a skill for double gold earning for 10 seconds
function activateSkill() {
  if (!skillActive) {
    skillActive = true;
    updateUI();
    setTimeout(() => {
      skillActive = false;
      updateUI();
    }, 10000); // Skill lasts for 10 seconds
  } else {
    alert("Skill already active!");
  }
}

// Function to start a quest that rewards gold after 20 seconds
function startQuest() {
  if (!questActive) {
    questActive = true;
    document.getElementById("quest-status").textContent = "Quest in progress...";
    
    setTimeout(() => {
      questActive = false;
      gold += heroLevel * 10; // Reward scales with hero level
      document.getElementById("quest-status").textContent = "Quest completed! Collected " + (heroLevel * 10) + " gold!";
      document.getElementById("quest-status").classList.add("active"); // Trigger animation

      setTimeout(() => {
        document.getElementById("quest-status").classList.remove("active");
      }, 300); // Reset animation after completion message

      updateUI();
    }, 20000); // Quest takes 20 seconds to complete
  } else {
    alert("Quest already in progress!");
  }
}

// Updates the displayed stats
function updateUI() {
  document.getElementById('gold').textContent = gold;
  document.getElementById('level').textContent = heroLevel;
  document.getElementById('gps').textContent = skillActive ? goldPerSecond * 2 : goldPerSecond;
  document.getElementById('levelCost').textContent = levelUpCost;
}

// Automatically collect gold over time
setInterval(() => {
  collectGold();
}, 1000); // Collect gold every second
