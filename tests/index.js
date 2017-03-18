"use strict";

const chai = require("chai");
const Permissions = require("../js/").Permissions;
const Role = require("../js/").Role;
const User = require("../js/permissions/roles/user").User;
const Utils = require("../js/").Utils;
const Locale = require("../js/").Locale;

const should = chai.should();

const LoveRaiderId = "9d77f237-b412-478b-b5ed-d46611a5e074";

describe("Permissions", function() {
  let LoveRaider;
  let permissions;

  before(function () {
    permissions = new Permissions();

    LoveRaider = new Role({
      id: LoveRaiderId,
      name: "Love Raider",
      type: "custom",
      inherits: [ User ],
      permissions: [
        "command:run:love_raider"
      ],
      boost: 0.50
    });
  });

  it("registers roles", function () {
    permissions.should.have.property("roles").that.has.property("User");
    permissions.should.have.property("roles").that.has.property("Subscriber");
    permissions.should.have.property("roles").that.has.property("Regular");
    permissions.should.have.property("roles").that.has.property("Moderator");
    permissions.should.have.property("roles").that.has.property("Owner");
    permissions.should.have.property("roles").that.has.property("Developer");
  });

  it("registers a custom role", function () {
    permissions.registerRole(LoveRaider);
    permissions.should.have.property("roles").that.has.property("Love Raider");

    const Raider = permissions.get("Love Raider");
    Raider.has("command:run:love_raider").should.be.true;
    Raider.type.should.eq("custom");
    Raider.has("channel:game:join").should.be.true;
    Raider.has("channel:quote:delete").should.be.false;
    Raider.getId().should.be.eq(LoveRaiderId);
  });

  it("get a role from an Id", function () {
    permissions.getById(LoveRaiderId).should.eq(LoveRaider);
    permissions.getById(LoveRaiderId).should.not.eq(permissions.get("Moderator"));
    should.not.exist(permissions.getById("001"));
  });

  it("does not allow a role to be registered again", function () {
    should.Throw(() => permissions.registerRole(LoveRaider), "Role already registered");
  });

  it("has a slug name", function () {
    const Moderator = permissions.get("Moderator");
    Moderator.getSlug().should.eq("moderator");

    const Raider = permissions.get("Love Raider");
    Raider.getSlug().should.eq("love-raider");
  });

  it("has role", function () {
    should.exist(permissions.get("Moderator"));
    should.not.exist(permissions.get("Cheese"));
  });

  it("has permissions", function () {
    const Moderator = permissions.get("Moderator");
    Moderator.getPerms().should.be.an("array");
  });

  it("checks role has permission", function() {
    const Moderator = permissions.get("Moderator");
    Moderator.has("channel:command:update").should.be.true;
    Moderator.has("channel:command:forceDelete").should.be.false;
  });

  it("adds a new permission", function () {
    const Moderator = permissions.get("Moderator");
    Moderator.add("testing:cheese");
    Moderator.permissions.includes("testing:cheese").should.be.true;
    Moderator.add("testing:cheese");
    Moderator.permissions.filter(perm => perm === "testing:cheese").should.have.length.of(1);
  });

  it("removes a permission", function () {
    const Moderator = permissions.get("Moderator");
    Moderator.remove("testing:cheese");
    Moderator.permissions.includes("testing:cheese").should.be.false;
  });

  it("overrides the current permissions", function () {
    const Moderator = permissions.get("Moderator");
    Moderator.set([ "channel:new:create", "channel:new:edit" ]);
    Moderator.permissions.includes("channel:command:update").should.be.false;
    Moderator.permissions.includes("channel:new:create").should.be.true;
  });

  it("checks if permissions are being inherited", function() {
    const Owner = permissions.get("Owner");
    Owner.has("channel:command:forceDelete").should.be.true;
    Owner.has("channel:command:create").should.be.true;
    Owner.has("channel:game:join").should.be.true;
    Owner.has("bot:developer:commands").should.be.false;
  });

  it("checks if role has wildcard permissions", function () {
    const Developer = permissions.get("Developer");
    Developer.has("*").should.be.true;
  });

  /**
   * This does not actually do what you would expect.
   * 
   * I.E. channel:*:update would return false as the code is looking for the * on the end of the scope.
   * 
   * TODO: Needs changing to allow sub "grouping" of the wildcard.
   */
  it("checks if role has sub wildcard permission", function () {
    const Moderator = permissions.get("Moderator");
    Moderator.add("channel:settings:*");
    Moderator.has("channel:settings:edit").should.be.true;
    Moderator.remove("channel:settings:*");
    Moderator.has("channel:settings:edit").should.be.false;
    // Moderator.has("channel:*:edit").should.be.true;
  });

  it("gets the registered user roles", function () {
    const roles = permissions.getRoles();
    should.exist(roles);
    Object.keys(roles).length.should.eq(7);
    should.exist(roles["Moderator"]);
  });

  it("gets permission definition", function () {
    Permissions.describe("user:voice").should.eq("Allow the bot to process the users messages.");
    should.not.exist(Permissions.describe("cheese:test"));
  });

  it("has a xp boost", function () {
    const Moderator = permissions.get("Moderator");
    Moderator.getBoost().should.eq(0);
    Moderator.getBoost().should.not.eq(10);

    LoveRaider.getBoost().should.eq(0.50);
  });

  it("changes the xp boost", function () {
    const Moderator = permissions.get("Moderator");
    Moderator.getBoost().should.eq(0);
    Moderator.setBoost(13);
    Moderator.getBoost().should.eq(13);
  });

  it("does allow to unregister a role", function () {
    permissions.unregisterRole(LoveRaider);
    should.not.exist(permissions.get("Love Raider"));
  });

  it("does not allow to unregister a role which is not found.", function () {
    should.Throw(() => permissions.unregisterRole(LoveRaider), "Role not found");
  });
});

describe("Utils", function () {
  it("collects string parts", function () {
    const parts = "I am testing the collecting of parts".split(" ");

    should.Throw(() => Utils.collectParts(parts, "......"), "Invalid task format");

    Utils.collectParts(parts, "0..").should.eql(parts);
    Utils.collectParts(parts, "1").should.eql([parts[1]]);
    Utils.collectParts(parts, "3..").should.eql(parts.slice(3, parts.length));

    Utils.collectParts(parts, "0-2").should.eql(parts.slice(0, 2));
  });

  it("strips user tagging", function () {
    Utils.stripUserTag("@artdude543").should.eq("artdude543");
    Utils.stripUserTag("#artdude543").should.eq("artdude543");
    Utils.stripUserTag("artdude543").should.eq("artdude543");
  });

  it("strips command prefixing", function () {
    Utils.stripCommand("!", "!cmd").should.eq("cmd");
    Utils.stripCommand(">", "!cmd").should.eq("!cmd");
  });

  it("converts bytes to be human readable", function () {
    Utils.bytesToSize(0).should.eq("0 Byte");
    Utils.bytesToSize("kjbob").should.be.NaN;

    Utils.bytesToSize(0).should.eq("0 Byte");
    Utils.bytesToSize(10000).should.eq("9.77 KB");
    Utils.bytesToSize(54684646546).should.eq("50.9 GB");
  });
});

describe("Locale", function () {
  it("gets the translation", function () {
    Locale.get("en_US", "command.generic.reply.user").should.eq("@%s, %s");
    Locale.get("cheese", "command.generic.reply.user").should.eq("@%s, %s");
  });

  it("translates the string", function () {
    Locale.translate("en_US", "command.generic.reply.user", "artdude543", "Hey there!").should.eq("@artdude543, Hey there!");
    Locale.translate("en_US", "command.generic.reply.user", "artdude543").should.eq("@artdude543, %s");
    Locale.translate("da_DK", "protection.purge.capsoveruse", "artdude543").should.eq("@artdude543 du blev lige pwnt for at bruge for mange caps!");

    Locale.translate("en_US", "command.generic.execution.string.short", "artdude543", "user name", 10).should.eq("@artdude543 Oops the argument for the user name is too short needs to be at least 10.");
    Locale.translate("en_US", "command.random.tableflip").should.eq("(╯°□°）╯︵ ┻━┻");
  });

  it("formats the string", function () {
    Locale.format("Hey there @%s!", "artdude543").should.eq("Hey there @artdude543!");
    Locale.format("Hey there!", "artdude543").should.eq("Hey there!");

    Locale.format("See numbers! %d", 1).should.eq("See numbers! 1");
  });
});
