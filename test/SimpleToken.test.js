const SimpleToken = artifacts.require("SimpleToken");

contract("SimpleToken", (accounts) => {
  let token;
  const [owner, recipient, spender] = accounts;
  const initialSupply = 1000000;

  beforeEach(async () => {
    token = await SimpleToken.new(initialSupply);
  });

  describe("Token Properties", () => {
    it("should have correct name", async () => {
      const name = await token.name();
      assert.equal(name, "SimpleToken");
    });

    it("should have correct symbol", async () => {
      const symbol = await token.symbol();
      assert.equal(symbol, "SIM");
    });

    it("should have correct decimals", async () => {
      const decimals = await token.decimals();
      assert.equal(decimals, 18);
    });

    it("should have correct total supply", async () => {
      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply, initialSupply * 10**18);
    });

    it("should assign total supply to owner", async () => {
      const balance = await token.balanceOf(owner);
      assert.equal(balance, initialSupply * 10**18);
    });
  });

  describe("Token Transfers", () => {
    it("should transfer tokens correctly", async () => {
      const amount = web3.utils.toWei("100", "ether");
      
      await token.transfer(recipient, amount, { from: owner });
      
      const ownerBalance = await token.balanceOf(owner);
      const recipientBalance = await token.balanceOf(recipient);
      
      assert.equal(recipientBalance, amount);
      assert.equal(ownerBalance, web3.utils.toWei("999900", "ether"));
    });

    it("should fail when transferring more than balance", async () => {
      const amount = web3.utils.toWei("2000000", "ether");
      
      try {
        await token.transfer(recipient, amount, { from: owner });
        assert.fail("Expected revert");
      } catch (error) {
        assert.include(error.message, "Insufficient balance");
      }
    });

    it("should fail when transferring to zero address", async () => {
      const amount = web3.utils.toWei("100", "ether");
      
      try {
        await token.transfer("0x0000000000000000000000000000000000000000", amount, { from: owner });
        assert.fail("Expected revert");
      } catch (error) {
        assert.include(error.message, "Cannot transfer to zero address");
      }
    });
  });

  describe("Token Allowances", () => {
    it("should approve allowance correctly", async () => {
      const amount = web3.utils.toWei("100", "ether");
      
      await token.approve(spender, amount, { from: owner });
      
      const allowance = await token.allowance(owner, spender);
      assert.equal(allowance, amount);
    });

    it("should transfer from allowance correctly", async () => {
      const amount = web3.utils.toWei("100", "ether");
      
      await token.approve(spender, amount, { from: owner });
      await token.transferFrom(owner, recipient, amount, { from: spender });
      
      const recipientBalance = await token.balanceOf(recipient);
      const remainingAllowance = await token.allowance(owner, spender);
      
      assert.equal(recipientBalance, amount);
      assert.equal(remainingAllowance, 0);
    });
  });
});
