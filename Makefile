
#
# Test.
#

test:
	@mocha -R spec test.js

#
# Build.
#

build: build-node

#
# Build node.
#

build-node: package.json
	@npm install

#
# Phony targets.
#

.PHONY: test