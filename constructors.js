class coreId {
    constructor(name, tag, id) {
        this.name = name;
        this.tag = tag;
        this.userId = id;
    }
}

class governmentDocument {
    /**
     * @param {string} department Issuing Department
     * @param {string} name Name of Document
     * @param {string} index Number of Document
     * @param {URL} link URL of link
     */
    constructor(department, name, index, link) {
        this.department = department;
        this.name = name;
        this.index = index;
        this.link = link;
    }

    correctName(newName) {
        this.name = newName;
    }
}

module.exports = {
    vote: class voteData {
        constructor(voter, votes) {
            this.voterInfo.status = "Valid";
            this.voterInfo.voter = voter;
            this.voterInfo.casted = Date.now();

            this.votes.data = votes;
            this.votes.count = -1; // since arrays are from 0-n, -1 is the new 0 B)
        }

        countVote() {
            if (this.votes.data.length > this.votes.count) {
                this.votes.count++;

                const nextVote = this.votes.data[this.votes.count];

                return nextVote;
            } else {
                return "No Candidate";
            }
        }

        invalidateVote(reason) {
            this.voterInfo.status = "Invalid";
            this.voterInfo.reason = reason;
        }
    },
    FedId: class FederalistId extends coreId {
        constructor(name, tag, id) {
            super(name, tag, id);
        }
    },
    OutsiderId: class OutsiderId extends coreId {
        constructor(name, tag, id) {
            super(name, tag, id);
        }
    },
    arrest: class ArrestInfo {

    },
    award: class Award {
        constructor(name, award) {
            this.name = name;
            this.issued = Date.now();
            this.award = award;
            // TODO: accept image links for visual of medal or whatever
        }

        overwriteIssue(newDate) {
            this.issued = newDate; // overwrite issue should be in unix
        }
    },
    bill: class Bill extends governmentDocument {
        constructor(department, name, index, link) {
            super(department, name, index, link);
        }
    },
    amendment: class Amendment extends governmentDocument {
        constructor(department, name, index, link) {
            super(department, name, index, link);
        }
    }
};