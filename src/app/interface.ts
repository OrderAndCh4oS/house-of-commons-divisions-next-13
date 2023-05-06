export interface Division {
    DivisionId: number;
    Date: Date;
    PublicationUpdated: Date;
    Number: number;
    IsDeferred: boolean;
    EVELType: string;
    EVELCountry: string;
    Title: string;
    AyeCount: number;
    NoCount: number;
    DoubleMajorityAyeCount: null;
    DoubleMajorityNoCount: null;
    AyeTellers: Teller[];
    NoTellers: Teller[];
    Ayes: Teller[];
    Noes: Teller[];
    RemoteVotingStart: null;
    RemoteVotingEnd: null;
}

export interface Member {
    MemberId: number,
    Name: string,
    Party: string,
    SubParty: string | null,
    PartyColour: string,
    PartyAbbreviation: string,
    MemberFrom: string,
    ListAs: string,
    ProxyName: string | null
}

export interface Teller {
    MemberId: number;
    Name: string;
    Party: Party;
    SubParty: null | string;
    PartyColour: PartyColour;
    PartyAbbreviation: PartyAbbreviation;
    MemberFrom: string;
    ListAs: string;
    ProxyName: null | string;
}

export enum Party {
    Conservative = "Conservative",
    GreenParty = "Green Party",
    Independent = "Independent",
    Labour = "Labour",
    LiberalDemocrat = "Liberal Democrat",
}

export enum PartyAbbreviation {
    Con = "Con",
    Green = "Green",
    Ind = "Ind",
    Lab = "Lab",
    Ld = "LD",
}

export enum PartyColour {
    C_C0C0C0 = "C0C0C0",
    C_F8A428 = "f8a428",
    C_Ff0000 = "ff0000",
    C_The0000Ff = "0000ff",
    C_78B82A = "78b82a",
}
