export const practicals = [
  {
    id: 1,
    title: 'DES Algorithm',
    Explaination_video_url : '<iframe width="560" height="315" src="https://www.youtube.com/embed/j53iXhTSi_s?si=tgJaZMLYjzHnPcxO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    implementations: {
      
      cpp: 
      `
      #include<iostream>
#include<vector>
using namespace std;

// S-DES Tables
int P10[] = {3, 5, 2, 7, 4, 10, 1, 9, 8, 6};
int P8[]  = {6, 3, 7, 4, 8, 5, 10, 9};
int IP[]  = {2, 6, 3, 1, 4, 8, 5, 7};
int EP[]  = {4, 1, 2, 3, 2, 3, 4, 1};
int P4[]  = {2, 4, 3, 1};
int IP_inv[] = {4, 1, 3, 5, 7, 2, 8, 6};

int S0[4][4] = {{1, 0, 3, 2}, {3, 2, 1, 0}, {0, 2, 1, 3}, {3, 1, 3, 2}};
int S1[4][4] = {{0, 1, 2, 3}, {2, 0, 1, 3}, {3, 0, 1, 0}, {2, 1, 0, 3}};

int k1, k2; // Subkeys

// Helper function to perform permutation
int permute(int input, int p[], int n, int len) {
    int res = 0;
    for(int i = 0; i < n; i++) {
        if((input >> (len - p[i])) & 1) 
            res |= (1 << (n - 1 - i));
    }
    return res;
}

// Left Circular Shift
int leftShift(int input, int n) {
    return ((input << n) & 0x1F) | ((input >> (5 - n)) & 0x1F); // 5-bit shift
}

// Key Generation
void generateKeys(int key) {
    key = permute(key, P10, 10, 10);
    int left = (key >> 5) & 0x1F;
    int right = key & 0x1F;
    left = leftShift(left, 1); right = leftShift(right, 1);
    k1 = permute((left << 5) | right, P8, 8, 10);
    left = leftShift(left, 2); right = leftShift(right, 2);
    k2 = permute((left << 5) | right, P8, 8, 10);
}

// S-Box Function
int sBox(int input) {
    int left = (input >> 4) & 0xF;
    int right = input & 0xF;
    int r1 = ((left & 8) >> 2) | (left & 1), c1 = (left >> 1) & 3;
    int r2 = ((right & 8) >> 2) | (right & 1), c2 = (right >> 1) & 3;
    return (S0[r1][c1] << 2) | S1[r2][c2];
}

// The f function
int f(int right, int sk) {
    int temp = permute(right, EP, 8, 4);
    temp = temp ^ sk;
    temp = sBox(temp);
    return permute(temp, P4, 4, 4);
}

int encrypt(int plaintext) {
    plaintext = permute(plaintext, IP, 8, 8);
    int left = (plaintext >> 4) & 0xF, right = plaintext & 0xF;
    int temp = f(right, k1);
    int newLeft = right;
    int newRight = left ^ temp;
    // Swap
    left = newRight; right = newLeft; 
    // Round 2
    temp = f(right, k2);
    newLeft = left ^ temp;
    return permute((newLeft << 4) | right, IP_inv, 8, 8);
}

int main() {
    int key = 0b1010000010; // 10-bit Key
    int pt = 0b11010111;    // 8-bit Plaintext
    
    generateKeys(key);
    int ct = encrypt(pt);
    
    cout << "Plaintext: " << pt << endl;
    cout << "Ciphertext (S-DES): " << ct << endl;
    return 0;
}
      `
    },
  },
  {
    id: 2,
    title: 'Caesar Cipher',
    Explaination_video_url : '<iframe width="560" height="315" src="https://www.youtube.com/embed/j53iXhTSi_s?si=tgJaZMLYjzHnPcxO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    implementations: {
      
      cpp: 
      `
      #include <iostream>
#include <string>
#include <vector>

using namespace std;

// --- Substitution: Caesar Cipher ---
string encryptCaesar(string text, int s) {
    string result = "";
    for (int i = 0; i < text.length(); i++) {
        if (isupper(text[i]))
            result += char(int(text[i] + s - 65) % 26 + 65);
        else if (islower(text[i]))
            result += char(int(text[i] + s - 97) % 26 + 97);
        else
            result += text[i];
    }
    return result;
}



int main() {
    string text = "HELLO WORLD";
    int s = 4;

    cout << "Original: " << text << endl;
    cout << "Substitution (Caesar): " << encryptCaesar(text, s) << endl;
    return 0;
}
      `
    },
  },
  {
    id: 3,
    title: 'Block Cipher',
    Explaination_video_url : '<iframe width="560" height="315" src="https://www.youtube.com/embed/j53iXhTSi_s?si=tgJaZMLYjzHnPcxO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    implementations: {
      
      cpp: 
      `
      #include <iostream>
#include <string>
#include <vector>

using namespace std;

// A simple custom block cipher encrypt function
// Block size: 4 bytes (Characters)
// Key: A single character for XOR
string simpleBlockEncrypt(string block, char key) {
    string encryptedBlock = "";
    for (char c : block) {
        // Step 1: XOR with Key
        char temp = c ^ key;
        // Step 2: Simple Transposition (Right shift ASCII)
        temp = temp + 1; 
        encryptedBlock += temp;
    }
    return encryptedBlock;
}

int main() {
    string plaintext = "CRYPTOGRAPHY"; // Length 12 (3 blocks of 4)
    char key = 'K';
    int blockSize = 4;
    
    cout << "Plaintext: " << plaintext << endl;
    
    string ciphertext = "";
    
    // Process in blocks
    for (int i = 0; i < plaintext.length(); i += blockSize) {
        string block = plaintext.substr(i, blockSize);
        // Pad with 'X' if block is short
        while(block.length() < blockSize) block += 'X';
        
        string encBlock = simpleBlockEncrypt(block, key);
        ciphertext += encBlock;
        
        cout << "Block " << (i/blockSize)+1 << ": " << block 
             << " -> " << encBlock << endl;
    }
    
    cout << "Final Ciphertext: " << ciphertext << endl;
    return 0;
}
      `
    },
  },
  
];