export class OneWayPlatform {
    static create(scene, group, x, y, textureKey, alpha = 1) {
        const platform = group.create(x, y, textureKey).setAlpha(alpha);
        platform.refreshBody();

        platform.body.checkCollision.up = true;
        platform.body.checkCollision.down = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;

        return platform;
    }
}
