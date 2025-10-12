export const practicals = [
  {
    id: 1,
    title: 'DES Algorithm',
    Explaination_video_url : '<iframe width="560" height="315" src="https://www.youtube.com/embed/j53iXhTSi_s?si=tgJaZMLYjzHnPcxO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    implementations: {
      python: `
from Crypto.Cipher import DES
from Crypto.Util.Padding import pad, unpad
import binascii

# Key must be 8 bytes long
key = b'mysecret' 
plaintext = b'This is a secret message for DES.'

# Create a DES cipher object
cipher = DES.new(key, DES.MODE_ECB)

# --- Encryption ---
# Pad the plaintext to be a multiple of 8 bytes (the DES block size)
padded_plaintext = pad(plaintext, DES.block_size)
ciphertext = cipher.encrypt(padded_plaintext)

print(f"Plaintext: {plaintext.decode()}")
print(f"Ciphertext (Hex): {binascii.hexlify(ciphertext).decode()}")

# --- Decryption ---
decipher = DES.new(key, DES.MODE_ECB)
decrypted_padded_plaintext = decipher.decrypt(ciphertext)
# Unpad the decrypted text to get the original message
decrypted_plaintext = unpad(decrypted_padded_plaintext, DES.block_size)

print(f"Decrypted Text: {decrypted_plaintext.decode()}")
      `,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <openssl/des.h>
#include <openssl/rand.h>
#include <iomanip>

// Helper to print byte arrays as hex
void print_hex(const std::vector<unsigned char>& data) {
    for (unsigned char byte : data) {
        std::cout << std::hex << std::setw(2) << std::setfill('0') << (int)byte;
    }
    std::cout << std::dec << std::endl;
}

int main() {
    // Key must be 8 bytes (64 bits) for DES
    DES_cblock key = {'m','y','s','e','c','r','e','t'};
    DES_key_schedule schedule;

    // Set the key schedule
    if (DES_set_key_checked(&key, &schedule) != 0) {
        std::cerr << "Error setting key schedule." << std::endl;
        return 1;
    }

    std::string p_text = "This is a secret message!!"; // Must be multiple of 8 bytes for ECB
    std::vector<unsigned char> plaintext(p_text.begin(), p_text.end());
    
    // Ensure plaintext is padded to a multiple of 8 bytes
    size_t remainder = plaintext.size() % 8;
    if (remainder != 0) {
        plaintext.insert(plaintext.end(), 8 - remainder, 8 - remainder);
    }

    std::vector<unsigned char> ciphertext(plaintext.size());
    std::vector<unsigned char> decryptedtext(plaintext.size());

    std::cout << "Plaintext: " << p_text << std::endl;

    // --- Encryption ---
    for (size_t i = 0; i < plaintext.size(); i += 8) {
        DES_ecb_encrypt((DES_cblock*)(plaintext.data() + i), (DES_cblock*)(ciphertext.data() + i), &schedule, DES_ENCRYPT);
    }
    
    std::cout << "Ciphertext (Hex): ";
    print_hex(ciphertext);

    // --- Decryption ---
    for (size_t i = 0; i < ciphertext.size(); i += 8) {
        DES_ecb_encrypt((DES_cblock*)(ciphertext.data() + i), (DES_cblock*)(decryptedtext.data() + i), &schedule, DES_DECRYPT);
    }

    // Remove padding for display
    size_t padding_val = decryptedtext.back();
    if (padding_val <= 8) {
         decryptedtext.resize(decryptedtext.size() - padding_val);
    }

    std::cout << "Decrypted Text: " << std::string(decryptedtext.begin(), decryptedtext.end()) << std::endl;

    return 0;
}
      `,
      java: `
      import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import java.util.Base64;
import java.util.Scanner;

public class DESExample {

    public static void main(String[] args) {
        try {
            Scanner sc = new Scanner(System.in);

            // User input key
            System.out.print("Enter 8-character key: ");
            String keyString = sc.nextLine();
            if (keyString.length() != 8) {
                System.out.println("Key must be exactly 8 characters long!");
                return;
            }

            // User input plaintext
            System.out.print("Enter plaintext: ");
            String plaintext = sc.nextLine();

            // --- Encryption ---
            DESKeySpec desKeySpec = new DESKeySpec(keyString.getBytes());
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
            SecretKey secretKey = keyFactory.generateSecret(desKeySpec);

            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

            byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes());
            String ciphertext = Base64.getEncoder().encodeToString(encryptedBytes);

            System.out.println("\nCiphertext (Base64): " + ciphertext);

            // --- Decryption ---
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
            String decryptedText = new String(decryptedBytes);

            System.out.println("Decrypted Text: " + decryptedText);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

      `
    },
  },
  
];