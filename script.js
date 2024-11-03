let gold = 0;
let hero = {
  name: "N/A",
  class: "N/A",
  level: 1,
  hp: 100,
  attackPower: 10,
  skills: [],
  inventory: []
};

// Character creation
function createCharacter() {
  const name = document.getElementById("name").value;
  const classChoice = document.getElementById("class").value;
  
  hero.name = name;
  hero.class = classChoice;
  
  if (classChoice === "warrior") {
    hero.hp = 120;
    hero.attackPower = 15;
  } else if (classChoice === "mage") {
    hero.hp = 80;
    hero.attackPower = 20;
  } else if (classChoice === "rogue") {
    hero.hp = 90;
    hero.attackPower = 18;
  }
  
  updateUI();
}

// Add item to inventory
function addItemToInventory(item) {
  if (item === "Potion" && gold >= 10) {
    hero.inventory.push("Potion");
    gold -= 10;
  } else if (item === "Sword" && gold >= 50) {
    hero.inventory.push("Sword");
    hero.attackPower += 5;
    gold -= 50;
  } else {
    alert("Not enough gold or invalid item!");
  }
  updateUI();
  displayInventory();
}

// Display inventory items
function displayInventory() {
  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = '';
  hero.inventory.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    inventoryList.appendChild(listItem);
  });
}

// Learn a new skill
function learnSkill() {
  if (gold >= 20) {
    const newSkill = hero.class === "warrior" ? "Power Strike" : hero.class === "mage" ? "Fireball" : "Stealth Attack";
    if (!hero.skills.includes(newSkill)) {
      hero.skills.push(newSkill);
      gold -= 20;
      displaySkills();
    } else {
      alert("Skill already learned!");
    }
  } else {
    alert("Not enough gold to learn skill!");
  }
  updateUI();
}

// Display skills
function displaySkills() {
  const skillList = document.getElementById("skill-list");
  skillList.innerHTML = '';
  hero.skills.forEach(skill => {
    const listItem = document.createElement("li");
    listItem.textContent = skill;
    skillList.appendChild(listItem);
  });
}

// Start a quest
function startQuest() {
  if (Math.random() > 0.5) {
    // Quest success
    const rewardGold = hero.level * 10;
    gold += rewardGold;
    document.getElementById("quest-status").textContent = `Quest successful! Gained ${rewardGold} gold.`;
  } else {
    // Quest failure
    const hpLoss = Math.floor(hero.hp * 0.2);
    hero.hp -= hpLoss;
    document.getElementById("quest-status").textContent = `Quest failed! Lost ${hpLoss} HP.`;
  }
  if (hero.hp <= 0) {
    alert("Your hero has died!");
    resetHero();
  }
  updateUI();
}

// Reset hero on death
function resetHero() {
  hero.level = 1;
  hero.hp = hero.class === "warrior" ? 120 : hero.class === "mage" ? 80 : 90;
  hero.skills = [];
  hero.inventory = [];
  gold = 0;
  updateUI();
  displayInventory();
  displaySkills();
}

// Update displayed stats
function updateUI() {
  document.getElementById("heroName").textContent = hero.name;
  document.getElementById("heroClass").textContent = hero.class;
  document.getElementById("heroLevel").textContent = hero.level;
  document.getElementById("heroHP").textContent = hero.hp;
  document.getElementById("attackPower").textContent = hero.attackPower;
  document.getElementById("gold").textContent = gold;
}

// Initialize game
updateUI();
