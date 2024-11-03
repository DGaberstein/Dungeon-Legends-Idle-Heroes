let gold = 0;
let heroLevel = 1;
let goldPerSecond = 1;
let levelUpCost = 10;

// Function to collect gold based on hero's level
function collectGold() {
  gold += goldPerSecond;
  updateUI();
}

// Function to level up the hero
function levelUp() {
  if (gold >= levelUpCost) {
    gold -= levelUpCost;
    heroLevel++;
    goldPerSecond = Math.floor(heroLevel * 1.5);  // Increases GPS as hero levels up
    levelUpCost = Math.floor(levelUpCost * 1.5);  // Level up cost increases
    updateUI();
  } else {
    alert("Not enough gold!");
  }
}

// Updates the displayed stats
function updateUI() {
  document.getElementById('gold').textContent = gold;
  document.getElementById('level').textContent = heroLevel;
  document.getElementById('gps').textContent = goldPerSecond;
  document.getElementById('levelCost').textContent = levelUpCost;
}

// Automatically collect gold over time
setInterval(() => {
  collectGold();
}, 1000);  // Collect gold every second
