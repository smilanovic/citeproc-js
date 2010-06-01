/*
 * Copyright (c) 2009 and 2010 Frank G. Bennett, Jr. All Rights
 * Reserved.
 *
 * The contents of this file are subject to the Common Public
 * Attribution License Version 1.0 (the “License”); you may not use
 * this file except in compliance with the License. You may obtain a
 * copy of the License at:
 *
 * http://bitbucket.org/fbennett/citeproc-js/src/tip/LICENSE.
 *
 * The License is based on the Mozilla Public License Version 1.1 but
 * Sections 14 and 15 have been added to cover use of software over a
 * computer network and provide for limited attribution for the
 * Original Developer. In addition, Exhibit A has been modified to be
 * consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an “AS IS”
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and limitations
 * under the License.
 *
 * The Original Code is the citation formatting software known as
 * "citeproc-js" (an implementation of the Citation Style Language
 * [CSL]), including the original test fixtures and software located
 * under the ./std subdirectory of the distribution archive.
 *
 * The Original Developer is not the Initial Developer and is
 * __________. If left blank, the Original Developer is the Initial
 * Developer.
 *
 * The Initial Developer of the Original Code is Frank G. Bennett,
 * Jr. All portions of the code written by Frank G. Bennett, Jr. are
 * Copyright (c) 2009 and 2010 Frank G. Bennett, Jr. All Rights Reserved.
 *
 * Alternatively, the contents of this file may be used under the
 * terms of the GNU Affero General Public License (the [AGPLv3]
 * License), in which case the provisions of [AGPLv3] License are
 * applicable instead of those above. If you wish to allow use of your
 * version of this file only under the terms of the [AGPLv3] License
 * and not to allow others to use your version of this file under the
 * CPAL, indicate your decision by deleting the provisions above and
 * replace them with the notice and other provisions required by the
 * [AGPLv3] License. If you do not delete the provisions above, a
 * recipient may use your version of this file under either the CPAL
 * or the [AGPLv3] License.”
 */

dojo.provide("citeproc_js.stack");

doh.register("citeproc_js.stack", [

	function testInstantiation() {
		function testme () {
			try {
				var obj = new CSL.Stack();
				return "Success";
			} catch (e) {
				return e;
			}
		}
		var res = testme();
		doh.assertEqual( "Success", res );
	},
	function testInitEmpty(){
		var obj = new CSL.Stack();
		doh.assertEqual(0, obj.mystack.length);
	},
	function testInitValue(){
		var obj = new CSL.Stack("hello");
		doh.assertEqual("hello", obj.mystack[0]);
	},
	function testInitUndefinedLiteral(){
		var obj = new CSL.Stack(undefined,true);
		doh.assertEqual(1, obj.mystack.length);
		doh.assertEqual("undefined", typeof obj.mystack[0]);
	},
	function testPushValue(){
		var obj = new CSL.Stack();
		obj.push("hello");
		doh.assertEqual("hello",obj.mystack[0]);
	},
	function testPushUndefinedValue(){
		var obj = new CSL.Stack();
		obj.push(undefined);
		doh.assertEqual(1, obj.mystack.length);
		doh.assertEqual("", obj.mystack[0]);
	},
	function testPushUndefinedLiteral(){
		var obj = new CSL.Stack();
		obj.push(undefined,true);
		doh.assertEqual(1, obj.mystack.length);
		doh.assertEqual("undefined", typeof obj.mystack[0]);
	},
	function testClear(){
		var obj = new CSL.Stack();
		obj.push("one");
		obj.push("two");
		doh.assertEqual(2, obj.mystack.length);
		obj.clear();
		doh.assertEqual(0, obj.mystack.length);
	},
	function testErrorOnEmptyStackReplace(){
		var obj = new CSL.Stack();
		try {
			obj.replace("hello");
			var res = "Ooops, this should raise an error";
		} catch (e){
			var res = e;
		}
		doh.assertEqual("Internal CSL processor error: attempt to replace nonexistent stack item with hello", res);
		CSL.debug(res + " (this error is correct)");
	},
	function testReplaceWithValue(){
		var obj = new CSL.Stack();
		obj.push("one");
		obj.push("two");
		obj.replace("two-and-a-half");
		doh.assertEqual("two-and-a-half", obj.mystack[1]);
	},
	function testReplaceNoValue(){
		var obj = new CSL.Stack();
		obj.push("one");
		obj.push("two");
		obj.replace();
		doh.assertEqual("", obj.mystack[1]);
	},
	function testPop(){
		var obj = new CSL.Stack();
		obj.push("one");
		obj.push("two");
		obj.pop();
		doh.assertEqual(1, obj.mystack.length);
		doh.assertEqual("undefined", typeof obj.mystack[1]);
		doh.assertEqual("one", obj.mystack[0]);
	},
	function testValue(){
		var obj = new CSL.Stack();
		obj.push("one");
		obj.push("two");
		doh.assertEqual("two", obj.value());
	},
	function testLength(){
		var obj = new CSL.Stack();
		obj.push("one");
		obj.push("two");
		doh.assertEqual(2, obj.length());
	}

]);
