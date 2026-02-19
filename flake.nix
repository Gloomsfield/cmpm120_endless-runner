{
	description = "cmpm120_endless-runner development environment";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
	};

	outputs = { self, nixpkgs }:
		let
			system = "aarch64-linux";
			pkgs = import nixpkgs { inherit system; };
		in {
			devShells.aarch64-linux.default = pkgs.mkShell {
				name = "cmpm120_endless-runner";

				buildInputs = with pkgs; [
					live-server
					typescript-language-server
				];

				shellHook = ''
					alias clockin='git commit --allow-empty -m "clock in"'
					alias clockout='git commit --allow-empty -m "clock out"'
				'';
			};
		};
}
