import { addOrMergeAccounts } from './utils';
import { Account } from './types';
import _ from 'lodash';

describe('addOrMergeAccounts', () => {
  it('should add a new account to an empty array', () => {
    const initialArray: Account[] = [];
    const newAccount: Account = { account_id: 1, balance: '100.00' };
    const expectedArray: Account[] = [{ account_id: 1, balance: '100.00' }];
    expect(addOrMergeAccounts(initialArray, newAccount)).toEqual(expectedArray);
  });

  it('should add a new account to an existing array', () => {
    const initialArray: Account[] = [{ account_id: 1, balance: '100.00' }];
    const newAccount: Account = { account_id: 2, balance: '200.00' };
    const expectedArray: Account[] = [
      { account_id: 1, balance: '100.00' },
      { account_id: 2, balance: '200.00' },
    ];
    expect(addOrMergeAccounts(initialArray, newAccount)).toEqual(expectedArray);
  });

  it('should merge an existing account', () => {
    const initialArray: Account[] = [{ account_id: 1, balance: '100.00' }];
    const updatedAccount: Account = { account_id: 1, balance: '150.00' };
    const expectedArray: Account[] = [{ account_id: 1, balance: '150.00' }];
    expect(addOrMergeAccounts(initialArray, updatedAccount)).toEqual(
      expectedArray
    );
  });

  it('should merge an existing account with partial data', () => {
    const initialArray: Account[] = [
      { account_id: 1, balance: '100.00' },
    ];
    const partialUpdate = { account_id: 1, balance: '250.00' };
    const expectedArray: Account[] = [
      { account_id: 1, balance: '250.00' },
    ];
    expect(addOrMergeAccounts(initialArray, partialUpdate as Account)).toEqual(
      expectedArray
    );
  });
});
