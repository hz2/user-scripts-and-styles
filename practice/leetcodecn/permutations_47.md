Problems: https://leetcode.cn/problems/permutations/

Example 1:
```bash
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```
Example 2:
```bash
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```
Example 3:
```bash
Input: nums = [1]
Output: [[1]]
```

=====

- first version
```ts
function permute(nums: number[]): number[][] {
    return nums.map((x: number, i: number) => {
        const pickout = x;
        const restArr = [...nums]
        if (restArr.length === 1) {
            return [pickout]
        }
        restArr.splice(i, 1);
        return permute(restArr).map((y: number[]) => [pickout, ...(Array.isArray(y) ? y : [y])])
    }).flat() as number[][]
};
```

- final version
```ts
function permute(nums: number[]): number[][] {
    return nums.length === 1 ? [nums] : nums.flatMap((x: number, i: number) => permute(nums.filter((_, j) => i !== j)).map((y: number[]) => [x, ...y]))
};
```
